// self.addEventListener("install", function (event) {
//   event.waitUntil(
//     caches.open("my-cache").then(function (cache) {
//       return cache.addAll([
//         "/",
//         "/index.html",
//         "/static/js/main.3da71462.js",
//         "/static/css/main.42bc8682.css",
//         "/offline.html", // Página de error personalizada
//         // Agrega aquí todos los demás recursos que quieras almacenar en caché
//       ]);
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   if (
//     event.request.method === "GET" &&
//     event.request.url.startsWith("http") &&
//     !event.request.url.startsWith("chrome-extension")
//   ) {
//     event.respondWith(
//       fetch(event.request)
//         .then((response) => {
//           const responseClone = response.clone();
//           caches
//             .open("my-cache")
//             .then((cache) => cache.put(event.request, responseClone));
//           return response;
//         })
//         .catch(() => caches.match(event.request))
//     );
//   }
// });

// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames
//           .filter((cacheName) => {
//             // En este punto, podrías borrar las cachés antiguas.
//             // Podrías adaptar este código para borrar sólo ciertas cachés.
//             return true;
//           })
//           .map((cacheName) => {
//             return caches.delete(cacheName);
//           })
//       );
//     })
//   );
// });
