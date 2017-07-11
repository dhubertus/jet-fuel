self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('assets-v2').then(cache => {
      return cache.addAll([
        '/',
        '/index.css',
        '/styles/dropdown.css',
        '/styles/folder-view.css',
        '/styles/main.css',
        '/styles/normalize.css',
        '/styles/images/road.jpg',
        '/src/card-input.js',
        '/src/create-folder.js',
        '/src/dropdown.js',
        '/src/helper.js',
        '/src/radio-btn.js',
      ])
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request)
      })
  )
})

self.addEventListener('activate', function(event) {
  let cacheWhitelist = ['assets-v2'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
