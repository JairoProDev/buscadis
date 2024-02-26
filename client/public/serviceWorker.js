self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/js/main.3da71462.js',
        '/static/css/main.42bc8682.css',
        '/offline.html', // Página de error personalizada
        // Agrega aquí todos los demás recursos que quieras almacenar en caché
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          // Actualiza la caché en segundo plano
          fetch(event.request).then(response => {
            caches.open('my-cache').then(cache => cache.put(event.request, response));
          });

          return cachedResponse;
        }

        return fetch(event.request)
          .then(response => {
            const responseClone = response.clone();
            caches.open('my-cache').then(cache => cache.put(event.request, responseClone));
            return response;
          })
          .catch(() => caches.match('/offline.html')); // Muestra la página de error personalizada si la solicitud falla
      })
    );
  }
});