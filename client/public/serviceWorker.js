/* eslint-env serviceworker */
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                // Aquí puedes agregar más rutas y recursos para cachear
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.endsWith('.js')) {
      event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
      );
    } else {
      event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
      );
    }
  });