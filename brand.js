(function () {
  var langs = ["en", "tr", "de", "fr", "es"];
  var chrome = {
    en: {
      nav_about: "About",
      nav_privacy: "Privacy",
      nav_terms: "Terms",
      nav_delete: "Delete account",
      footer_follow: "Follow Qoop",
      footer_copy: "© 2026 Qoop"
    },
    tr: {
      nav_about: "Hakkında",
      nav_privacy: "Gizlilik",
      nav_terms: "Koşullar",
      nav_delete: "Hesabı sil",
      footer_follow: "Qoop’u takip et",
      footer_copy: "© 2026 Qoop"
    },
    de: {
      nav_about: "Über uns",
      nav_privacy: "Datenschutz",
      nav_terms: "Nutzung",
      nav_delete: "Konto löschen",
      footer_follow: "Qoop folgen",
      footer_copy: "© 2026 Qoop"
    },
    fr: {
      nav_about: "À propos",
      nav_privacy: "Confidentialité",
      nav_terms: "Conditions",
      nav_delete: "Supprimer le compte",
      footer_follow: "Suivre Qoop",
      footer_copy: "© 2026 Qoop"
    },
    es: {
      nav_about: "Acerca de",
      nav_privacy: "Privacidad",
      nav_terms: "Términos",
      nav_delete: "Eliminar cuenta",
      footer_follow: "Seguir a Qoop",
      footer_copy: "© 2026 Qoop"
    }
  };

  function pick() {
    var h = (location.hash || "").replace("#", "").toLowerCase();
    if (langs.indexOf(h) >= 0) return h;
    try {
      var s = localStorage.getItem("qoop_legal_lang");
      if (langs.indexOf(s) >= 0) return s;
    } catch (e) {}
    var n = (navigator.language || "en").slice(0, 2).toLowerCase();
    return langs.indexOf(n) >= 0 ? n : "en";
  }

  function dict(lang) {
    var page = window.QOOP_PAGE && window.QOOP_PAGE[lang] ? window.QOOP_PAGE[lang] : {};
    var base = chrome[lang] || chrome.en;
    var out = {};
    Object.keys(base).forEach(function (k) { out[k] = base[k]; });
    Object.keys(page).forEach(function (k) { out[k] = page[k]; });
    return out;
  }

  function apply(lang) {
    var t = dict(lang);
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll(".lang-switch a").forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + lang);
    });
    document.querySelectorAll(".lang-panel").forEach(function (el) {
      el.classList.toggle("is-active", el.id === lang);
    });
    try { localStorage.setItem("qoop_legal_lang", lang); } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () { apply(pick()); });
  window.addEventListener("hashchange", function () { apply(pick()); });
})();
