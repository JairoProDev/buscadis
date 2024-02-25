self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/js/main.3da71462.js',
        '/static/css/main.42bc8682.css',
        // Agrega aquí todos los demás recursos que quieras almacenar en caché
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(response => {
        const responseClone = response.clone();
        caches.open('my-cache').then(cache => cache.put(event.request, responseClone));
        return response;
      });
    })
  );
});