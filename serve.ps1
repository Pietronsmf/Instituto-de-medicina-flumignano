# Servidor estático leve (HttpListener) com suporte a HTTP Range para vídeo.
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$port = 4173

$mime = @{
  ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8";
  ".js"="application/javascript; charset=utf-8"; ".json"="application/json";
  ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg";
  ".gif"="image/gif"; ".svg"="image/svg+xml"; ".ico"="image/x-icon";
  ".mp4"="video/mp4"; ".webm"="video/webm"; ".woff2"="font/woff2"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Servindo '$root' em http://localhost:$port/"

while ($listener.IsListening) {
  try { $ctx = $listener.GetContext() } catch { break }
  try {
    $req = $ctx.Request; $res = $ctx.Response
    $rel = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath)
    if ($rel -eq "/" -or $rel -eq "") { $rel = "/index.html" }
    $file = Join-Path $root ($rel.TrimStart("/").Replace("/", "\"))

    if (-not (Test-Path -LiteralPath $file -PathType Leaf)) {
      $res.StatusCode = 404
      $b = [Text.Encoding]::UTF8.GetBytes("404 Not Found: $rel")
      $res.OutputStream.Write($b, 0, $b.Length); $res.OutputStream.Close(); continue
    }

    $ext = [IO.Path]::GetExtension($file).ToLower()
    $res.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
    $res.Headers["Accept-Ranges"] = "bytes"
    $res.Headers["Cache-Control"] = "no-cache"

    $fs = [IO.File]::OpenRead($file)
    $total = $fs.Length
    $range = $req.Headers["Range"]

    if ($range -and ($range -match "bytes=(\d*)-(\d*)")) {
      $start = if ($matches[1] -ne "") { [int64]$matches[1] } else { 0 }
      $end   = if ($matches[2] -ne "") { [int64]$matches[2] } else { $total - 1 }
      if ($end -ge $total) { $end = $total - 1 }
      $len = $end - $start + 1
      $res.StatusCode = 206
      $res.Headers["Content-Range"] = "bytes $start-$end/$total"
      $res.ContentLength64 = $len
      [void]$fs.Seek($start, "Begin")
    } else {
      $res.StatusCode = 200
      $res.ContentLength64 = $total
      $len = $total
    }

    $buf = New-Object byte[] 65536
    $remaining = $len
    while ($remaining -gt 0) {
      $toRead = [Math]::Min($buf.Length, $remaining)
      $read = $fs.Read($buf, 0, $toRead)
      if ($read -le 0) { break }
      $res.OutputStream.Write($buf, 0, $read)
      $remaining -= $read
    }
    $fs.Close()
    $res.OutputStream.Close()
  } catch {
    try { $ctx.Response.StatusCode = 500; $ctx.Response.OutputStream.Close() } catch {}
  }
}
