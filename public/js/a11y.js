// Minimal enhancements:
// - Ensure skip link moves focus into main reliably across browsers.
// - Preserve logical DOM order; no keyboard traps introduced here.

(function () {
  function focusTargetFromHash(e) {
    // Allow native behavior; ensure target is focusable
    var id = (location.hash || "").slice(1);
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    // Make sure element is focusable
    if (el.tabIndex < 0) {
      el.tabIndex = -1;
    }
    el.focus();
  }

  // On load with hash
  window.addEventListener("DOMContentLoaded", function () {
    if (location.hash) focusTargetFromHash();
  });

  // On skip-link click, let the browser jump, then focus
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t.matches && t.matches('a.skip-link[href^="#"]')) {
      // Allow default scroll then focus shortly after
      setTimeout(focusTargetFromHash, 0);
    }
  });
})();