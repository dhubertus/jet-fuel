self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('assets-v1').then(cache => {
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
