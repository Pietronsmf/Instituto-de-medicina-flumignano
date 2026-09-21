/* =========================================================
   Corpo Clínico render dos cards + modal do profissional
   Dados vêm de medicos-data.js (window.MEDICOS)
   ========================================================= */
(function () {
  "use strict";
  const grid = document.getElementById("teamAll");
  if (!grid || !window.MEDICOS) return;

  const WA = window.MEDICOS_WA || {};
  const ALL = window.MEDICOS.slice();

  // Ordem: os "featured" primeiro (na sua ordem); os demais em ordem alfabética,
  // ignorando o título "Dr./Dra./Prof."
  ALL.sort((a, b) => {
    const fa = a.featured || 0, fb = b.featured || 0;
    if (fa && fb) return fa - fb;
    if (fa) return -1;
    if (fb) return 1;
    const key = (n) => n.replace(/^(dra?|prof[aª]?)\.?\s+/i, "");
    return key(a.name).localeCompare(key(b.name), "pt", { sensitivity: "base" });
  });

  const cardHTML = (d, i) => {
    const avatar = d.img
      ? '<div class="doc__avatar"><img src="' + d.img + '" alt="' + d.name + '" loading="lazy" onerror="this.parentNode.textContent=\'' + d.initials + '\'"></div>'
      : '<div class="doc__avatar">' + d.initials + "</div>";
    return (
      '<article class="doc" role="button" tabindex="0" data-i="' + i + '" aria-label="Ver perfil de ' + d.name + '">' +
      '<span class="doc__zoom"><svg><use href="#i-eye"/></svg></span>' +
      avatar +
      '<span class="doc__loc"><svg><use href="#i-pin"/></svg>' + d.unit + "</span>" +
      "<h3>" + d.name + "</h3>" +
      '<p class="spec">' + d.spec + "</p>" +
      "</article>"
    );
  };

  grid.innerHTML = ALL.map((d, i) => cardHTML(d, i)).join("");

  /* ---- Modal ---- */
  const modal = document.getElementById("docModal");
  if (!modal) return;
  const dm = {
    avatar: document.getElementById("dmAvatar"),
    name: document.getElementById("dmName"),
    spec: document.getElementById("dmSpec"),
    unit: document.getElementById("dmUnit"),
    bio: document.getElementById("dmBio"),
    wa: document.getElementById("dmWa"),
    ig: document.getElementById("dmIg"),
    email: document.getElementById("dmEmail"),
    more: document.getElementById("dmMore")
  };
  let lastFocus = null;

  const toggle = (el, on) => { if (el) el.style.display = on ? "" : "none"; };

  const openModal = (d) => {
    dm.name.textContent = d.name;
    dm.spec.textContent = d.spec;
    dm.unit.textContent = d.unit;
    dm.bio.textContent = d.bio;
    dm.avatar.innerHTML = d.img
      ? '<img src="' + d.img + '" alt="' + d.name + '" onerror="this.parentNode.textContent=\'' + d.initials + '\'">'
      : d.initials;
    // Contatos (esqueleto: Instagram/e-mail aparecem quando preenchidos em medicos-data.js)
    if (dm.wa) dm.wa.href = WA[d.unit] || WA["Rio de Janeiro"] || "#";
    if (dm.ig) { if (d.instagram) dm.ig.href = d.instagram; toggle(dm.ig, !!d.instagram); }
    if (dm.email) { if (d.email) dm.email.href = "mailto:" + d.email; toggle(dm.email, !!d.email); }
    if (dm.more) dm.more.href = "medico.html?id=" + encodeURIComponent(d.slug);
    modal.classList.add("open");
    document.body.classList.add("modal-open");
    const cls = modal.querySelector(".modal__close");
    if (cls) cls.focus();
  };
  const closeModal = () => {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
  };

  const handleActivate = (el) => {
    const i = +el.getAttribute("data-i");
    if (!isNaN(i) && ALL[i]) { lastFocus = el; openModal(ALL[i]); }
  };

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".doc");
    if (card) handleActivate(card);
  });
  grid.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const card = e.target.closest(".doc");
      if (card) { e.preventDefault(); handleActivate(card); }
    }
  });

  modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
})();
