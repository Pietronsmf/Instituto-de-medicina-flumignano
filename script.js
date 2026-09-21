/* =========================================================
   Instituto Flumignano de Medicina — Interações
   ========================================================= */
(function () {
  "use strict";

  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const backdrop = document.getElementById("navBackdrop");
  const toTop = document.getElementById("toTop");

  /* ---- Ano no rodapé ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Header sólido + botão voltar ao topo ao rolar ---- */
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);
    toTop.classList.toggle("show", y > 600);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Menu mobile ---- */
  const openMenu = () => {
    nav.classList.add("open");
    backdrop.classList.add("show");
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
  };
  const closeMenu = () => {
    nav.classList.remove("open");
    backdrop.classList.remove("show");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () =>
    nav.classList.contains("open") ? closeMenu() : openMenu()
  );
  backdrop.addEventListener("click", closeMenu);
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ---- Voltar ao topo ---- */
  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  /* ---- Reveal on scroll ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---- Contadores animados ---- */
  const counters = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute("data-count"));
    const suffix = el.getAttribute("data-suffix") || "";
    const isYear = target >= 1900; // anos não levam separador
    const duration = 1500;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.floor(eased * target);
      el.textContent = (isYear ? val : val.toLocaleString("pt-BR")) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = (isYear ? target : target.toLocaleString("pt-BR")) + suffix;
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => cio.observe(el));
  }

  /* ---- Destaque do item de menu ativo ---- */
  const sections = [...document.querySelectorAll("section[id]")];
  const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
  const linkFor = (id) => navLinks.find((a) => a.getAttribute("href") === "#" + id);
  if ("IntersectionObserver" in window && sections.length) {
    const sio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((a) => a.classList.remove("active"));
            const link = linkFor(entry.target.id);
            if (link) link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => sio.observe(s));
  }

  /* ---- FAB: seletor de unidade (WhatsApp) ---- */
  const fabWrap = document.getElementById("fabWrap");
  const fabWa = document.getElementById("fabWa");
  const fabMenu = document.getElementById("fabMenu");
  if (fabWrap && fabWa && fabMenu) {
    const setFab = (open) => {
      fabMenu.classList.toggle("open", open);
      fabWa.classList.toggle("is-active", open);
      fabWa.setAttribute("aria-expanded", open ? "true" : "false");
    };
    fabWa.addEventListener("click", (e) => {
      e.stopPropagation();
      setFab(!fabMenu.classList.contains("open"));
    });
    document.addEventListener("click", (e) => {
      if (!fabWrap.contains(e.target)) setFab(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setFab(false);
    });
    fabMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => setFab(false))
    );
  }

  /* ---- Garante reprodução do vídeo de fundo (inclusive mobile) ---- */
  const video = document.querySelector(".hero__video");
  if (video) {
    video.muted = true;
    video.setAttribute("playsinline", "");
    const play = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    play();
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) play();
    });
    // Em alguns navegadores mobile o autoplay só libera após interação
    const kick = () => play();
    window.addEventListener("touchstart", kick, { passive: true, once: true });
    window.addEventListener("scroll", kick, { passive: true, once: true });
  }

  /* ---- Modal "Em qual unidade?" para os botões Agendar (amarelos) ---- */
  const RIO_WA = "https://wa.me/5521987561627";
  const CWB_WA = "https://api.whatsapp.com/send?phone=5541996182974&text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta.";
  const agendarBtns = document.querySelectorAll('a.btn-gold[href*="5521987561627"]');
  if (agendarBtns.length) {
    const wa =
      '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1.1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.8-1c.2-.2.4-.2.6-.1l2 1c.3.1.4.2.5.3.1.2.1.7-.1 1.4Z"/></svg>';
    const xIcon =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="20" height="20"><path d="M6 6l12 12M18 6 6 18"/></svg>';
    const arr =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    const el = document.createElement("div");
    el.className = "modal unit-modal";
    el.id = "unitModal";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Escolher unidade para agendar");
    el.innerHTML =
      '<div class="modal__backdrop" data-uclose></div>' +
      '<div class="modal__dialog">' +
      '<button class="modal__close" data-uclose aria-label="Fechar">' + xIcon + "</button>" +
      '<div class="unit-modal__head"><span class="unit-modal__eyebrow">Agendar consulta</span><h3>Em qual unidade?</h3><p>Selecione a unidade para falar no WhatsApp.</p></div>' +
      '<div class="unit-modal__opts">' +
      '<a href="' + RIO_WA + '" target="_blank" rel="noopener"><span class="ic">' + wa + '</span><span class="t"><b>Rio de Janeiro</b><small>(21) 98756-1627</small></span><span class="arr">' + arr + "</span></a>" +
      '<a href="' + CWB_WA + '" target="_blank" rel="noopener"><span class="ic">' + wa + '</span><span class="t"><b>Curitiba</b><small>(41) 99618-2974</small></span><span class="arr">' + arr + "</span></a>" +
      "</div></div>";
    document.body.appendChild(el);

    const openUnit = () => { el.classList.add("open"); document.body.classList.add("modal-open"); };
    const closeUnit = () => { el.classList.remove("open"); document.body.classList.remove("modal-open"); };
    agendarBtns.forEach((b) =>
      b.addEventListener("click", (e) => { e.preventDefault(); openUnit(); })
    );
    el.querySelectorAll("[data-uclose]").forEach((c) => c.addEventListener("click", closeUnit));
    el.querySelectorAll(".unit-modal__opts a").forEach((a) => a.addEventListener("click", closeUnit));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && el.classList.contains("open")) closeUnit();
    });
  }

  /* ---- Visualizador in-page: artigos nativos (estudos) e PDFs ---- */
  if (document.querySelector("[data-view]") || document.querySelector("[data-article]") || document.getElementById("studyGrid")) {
    const ext =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M14 4h6v6M20 4l-9 9M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/></svg>';
    const xs =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="18" height="18"><path d="M6 6l12 12M18 6 6 18"/></svg>';
    const v = document.createElement("div");
    v.className = "modal doc-viewer";
    v.id = "docViewer";
    v.setAttribute("role", "dialog");
    v.setAttribute("aria-modal", "true");
    v.innerHTML =
      '<div class="modal__backdrop" data-vclose></div>' +
      '<div class="modal__dialog">' +
      '<div class="doc-viewer__bar"><h3 id="dvTitle">Documento</h3>' +
      '<a id="dvOpen" target="_blank" rel="noopener">' + ext + "<span>Abrir em nova aba</span></a>" +
      '<button class="x" data-vclose aria-label="Fechar">' + xs + "</button></div>" +
      '<div class="doc-viewer__body">' +
      '<div class="doc-viewer__frame" id="dvFrameWrap"><div class="doc-viewer__loading">Carregando documento…</div><iframe id="dvFrame" title="Visualizador de documento" referrerpolicy="no-referrer-when-downgrade"></iframe></div>' +
      '<div class="doc-viewer__content" id="dvContent"></div>' +
      "</div></div>";
    document.body.appendChild(v);
    const frame = v.querySelector("#dvFrame");
    const frameWrap = v.querySelector("#dvFrameWrap");
    const content = v.querySelector("#dvContent");
    const title = v.querySelector("#dvTitle");
    const openLink = v.querySelector("#dvOpen");
    const openLinkSpan = openLink.querySelector("span");

    const show = () => { v.classList.add("open"); document.body.classList.add("modal-open"); };

    // Modo iframe (PDFs)
    const openView = (url, t) => {
      if (!url) return;
      title.textContent = t || "Documento";
      openLink.href = url; openLink.style.display = ""; openLinkSpan.textContent = "Abrir em nova aba";
      content.style.display = "none"; content.innerHTML = "";
      frameWrap.style.display = ""; frame.src = url;
      show();
    };

    // Modo artigo nativo (estudos migrados — nada carrega do site externo)
    const openArticle = (slug) => {
      const a = window.ESTUDOS && window.ESTUDOS[slug];
      if (!a) return;
      title.textContent = a.title;
      frame.src = "about:blank"; frameWrap.style.display = "none";
      content.innerHTML = ""; content.style.display = "block";
      const art = document.createElement("article");
      art.className = "study-article";
      const d = document.createElement("span"); d.className = "study-article__date"; d.textContent = a.date; art.appendChild(d);
      const h = document.createElement("h2"); h.textContent = a.title; art.appendChild(h);
      if (a.subtitle) { const st = document.createElement("p"); st.className = "study-article__subtitle"; st.textContent = a.subtitle; art.appendChild(st); }
      if (a.embed) {
        const m = document.createElement("div"); m.className = "study-article__media";
        if (a.embed.type === "yt") {
          const ifr = document.createElement("iframe");
          ifr.src = "https://www.youtube.com/embed/" + a.embed.id;
          ifr.title = "Vídeo"; ifr.loading = "lazy";
          ifr.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          ifr.setAttribute("allowfullscreen", "");
          m.appendChild(ifr);
        } else if (a.embed.type === "mp4") {
          const vid = document.createElement("video");
          vid.src = a.embed.src; vid.controls = true; vid.preload = "metadata"; vid.setAttribute("playsinline", "");
          m.appendChild(vid);
        } else if (a.embed.type === "drive") {
          const ifr = document.createElement("iframe");
          ifr.src = "https://drive.google.com/file/d/" + a.embed.id + "/preview";
          ifr.title = "Material"; ifr.loading = "lazy"; ifr.setAttribute("allow", "autoplay"); ifr.setAttribute("allowfullscreen", "");
          m.appendChild(ifr);
        }
        art.appendChild(m);
      }
      if (a.images && a.images.length) {
        a.images.forEach((src) => {
          const fig = document.createElement("img");
          fig.className = "study-article__img";
          fig.src = src; fig.loading = "lazy"; fig.alt = a.title;
          art.appendChild(fig);
        });
      }
      (a.p || []).forEach((par) => { const pp = document.createElement("p"); pp.textContent = par; art.appendChild(pp); });
      if (a.links && a.links.length) {
        const lk = document.createElement("div"); lk.className = "study-article__links";
        a.links.forEach((l) => {
          const ic = ({ pdf: "i-doc", video: "i-video", drive: "i-video", external: "i-external", download: "i-download" })[l.kind] || "i-external";
          const aEl = document.createElement("a");
          aEl.href = l.url; aEl.target = "_blank"; aEl.rel = "noopener";
          aEl.className = "study-link study-link--" + (l.kind || "external");
          aEl.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><use href="assets/icons.svg#' + ic + '"/></svg>';
          aEl.appendChild(document.createTextNode(" " + l.label));
          lk.appendChild(aEl);
        });
        art.appendChild(lk);
      }
      if (a.source && a.source.name) {
        const sp = document.createElement("p"); sp.className = "study-article__source"; sp.textContent = a.source.name;
        if (a.source.url) {
          sp.appendChild(document.createTextNode(" · "));
          const sa = document.createElement("a"); sa.href = a.source.url; sa.target = "_blank"; sa.rel = "noopener"; sa.textContent = "ver original"; sp.appendChild(sa);
        }
        art.appendChild(sp);
      }
      content.appendChild(art);
      if (a.source && a.source.url) { openLink.href = a.source.url; openLink.style.display = ""; openLinkSpan.textContent = "Ver fonte original"; }
      else { openLink.style.display = "none"; }
      show();
      content.scrollTop = 0;
    };

    const closeView = () => {
      v.classList.remove("open");
      document.body.classList.remove("modal-open");
      frame.src = "about:blank";
      content.innerHTML = "";
    };

    // Delegação: funciona com elementos estáticos e renderizados dinamicamente
    const handle = (e) => {
      const art = e.target.closest("[data-article]");
      if (art) { e.preventDefault(); openArticle(art.getAttribute("data-article")); return; }
      const t = e.target.closest("[data-view]");
      if (t) { e.preventDefault(); openView(t.getAttribute("data-view"), t.getAttribute("data-view-title")); }
    };
    document.addEventListener("click", handle);
    document.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && e.target && e.target.closest && (e.target.closest("[data-article]") || e.target.closest("[data-view]"))) handle(e);
    });
    v.querySelectorAll("[data-vclose]").forEach((c) => c.addEventListener("click", closeView));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && v.classList.contains("open")) closeView();
    });
  }
})();
