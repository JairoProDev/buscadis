const CACHE_NAME = "my-cache-v1";
const OFFLINE_URL = "/offline.html";
const urlsToCache = [
  "/",
  "/index.html",
  "/static/js/main.js",
  "/static/css/main.css",
  "/static/media/",
  OFFLINE_URL,
  // Agrega aquí todos los demás recursos que quieras almacenar en caché
];

// Evento de instalación del Service Worker
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Activa el Service Worker inmediatamente sin esperar a que los clientes actuales se cierren
});

// Evento de activación del Service Worker
self.addEventListener("activate", function (event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return Promise.resolve(); // Asegura que se devuelva un valor
        })
      );
    })
  );
  self.clients.claim(); // Toma el control de las páginas abiertas sin necesidad de recargarlas
});

// Evento de fetch para interceptar las solicitudes de red
self.addEventListener("fetch", (event) => {
  if (
    event.request.method === "GET" &&
    event.request.url.startsWith("http") &&
    !event.request.url.startsWith("chrome-extension")
  ) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response; // Si el recurso está en caché, lo devuelve
        }
        return fetch(event.request).then(function (response) {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      }).catch(function () {
        return caches.match(OFFLINE_URL); // Si falla la solicitud, devuelve la página offline
      })
    );
  }
});