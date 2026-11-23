// Highlight the contents entry for the section currently in view.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc-sub a'));
  if (!links.length || !('IntersectionObserver' in window)) return;
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
  var visible = {};
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
    var current = null;
    links.some(function (a) {
      var id = a.getAttribute('href').slice(1);
      if (visible[id]) { current = id; return true; }
      return false;
    });
    if (!current) return;
    links.forEach(function (a) { a.classList.toggle('active', a === byId[current]); });
  }, { rootMargin: '-90px 0px -55% 0px' });
  Object.keys(byId).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
