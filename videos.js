// Sub-portal video list — shared by cooking-videos.html and vegetarian.html.
// The page picks its list via <body data-list="cooking|vegetarian">.
// Entries in videos.json: { "id": "<youtube video id>", "title": "<title>" }.
(function () {
  var listName = document.body.getAttribute('data-list');
  var wrap = document.getElementById('video-list');

  function renderVideo(entry) {
    var card = document.createElement('article');
    card.className = 'exam-card';

    var h = document.createElement('h2');
    h.textContent = entry.title || '';
    card.appendChild(h);

    var frame = document.createElement('div');
    frame.className = 'video-frame';
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + entry.id;
    iframe.title = entry.title || 'YouTube video';
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('allowfullscreen', '');
    frame.appendChild(iframe);
    card.appendChild(frame);

    return card;
  }

  function render(data) {
    var list = (data && data[listName]) || [];
    if (!list.length) {
      var p = document.createElement('p');
      p.className = 'cl-empty';
      p.textContent = 'No videos yet.';
      wrap.appendChild(p);
      return;
    }
    list.forEach(function (entry) { wrap.appendChild(renderVideo(entry)); });
  }

  fetch('videos.json', { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(render)
    .catch(function () { render({}); });
})();
