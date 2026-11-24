// Sub-portal recipe sheets — shared by cooking-videos.html and vegetarian.html.
// The page picks its list via <body data-list="cooking|vegetarian">.
// Entries in recipes.json: { "file": "<page>.html", "title": "<title>", "note": "<short line>" }.
// Renders nothing when the list is empty.
(function () {
  var listName = document.body.getAttribute('data-list');
  var wrap = document.getElementById('recipe-list');
  if (!wrap) return;

  function render(data) {
    var list = (data && data[listName]) || [];
    if (!list.length) return;
    var h = document.createElement('h2');
    h.textContent = 'Recipe sheets';
    wrap.appendChild(h);
    list.forEach(function (entry) {
      var card = document.createElement('article');
      card.className = 'exam-card';
      var link = document.createElement('a');
      link.href = entry.file;
      link.textContent = entry.title || '';
      card.appendChild(link);
      if (entry.note) {
        var p = document.createElement('p');
        p.textContent = entry.note;
        card.appendChild(p);
      }
      wrap.appendChild(card);
    });
  }

  fetch('recipes.json', { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(render)
    .catch(function () { render({}); });
})();
