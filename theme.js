// Day (summer hill) / night (hearth) theme toggle.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  function label() {
    if (!btn) return;
    var dark = root.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    btn.title = dark ? 'Let the fire rest' : 'Light the hearth';
  }
  function stored() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
  label();
  if (btn) btn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    label();
  });
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) {
      if (stored()) return;
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      label();
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
  }
})();
