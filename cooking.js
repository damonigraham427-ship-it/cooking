// Cooking portal — two sub-portals (Cooking / Vegetarian Cooking).
// Card counts come live from videos.json; each card doors into its
// sub-portal page, which renders the embedded videos via videos.js.
(function () {
  var wrap = document.getElementById('portal-cards');

  function navCard(label, sub, href) {
    var b = document.createElement('button');
    b.className = 'nav-card';
    b.textContent = label;
    var s = document.createElement('small');
    s.textContent = sub;
    b.appendChild(s);
    b.addEventListener('click', function () { location.href = href; });
    return b;
  }

  function render(data) {
    var cooking = (data && data.cooking) || [];
    var vegetarian = (data && data.vegetarian) || [];
    wrap.appendChild(navCard('Cooking', 'videos \u00B7 ' + cooking.length, 'cooking-videos.html'));
    wrap.appendChild(navCard('Vegetarian Cooking', 'videos \u00B7 ' + vegetarian.length, 'vegetarian.html'));
  }

  fetch('videos.json', { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(render)
    .catch(function () { render({}); });
})();
