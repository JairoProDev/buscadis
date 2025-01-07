const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `buscadis-cache-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico'
];

const DYNAMIC_RESOURCES = [
  /\.js$/,
  /\.css$/,
  /\.png$/,
  /\.jpg$/,
  /\.svg$/
];

// Instalación: Caché inicial
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(STATIC_RESOURCES);
      self.skipWaiting();
    })()
  );
});

// Activación: Limpieza de caché antiguo
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => name.startsWith('buscadis-cache-') && name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

// Estrategia de caché
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  
  // Ignorar solicitudes de desarrollo
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Recursos estáticos: Cache First
      if (STATIC_RESOURCES.includes(url.pathname)) {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) return cachedResponse;
      }

      // Recursos dinámicos: Network First con fallback a caché
      if (DYNAMIC_RESOURCES.some(pattern => pattern.test(url.pathname))) {
        try {
          const response = await fetch(event.request);
          if (response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        } catch (error) {
          const cachedResponse = await cache.match(event.request);
          if (cachedResponse) return cachedResponse;
          return cache.match(OFFLINE_URL);
        }
      }

      // API calls: Network Only con fallback offline
      try {
        const response = await fetch(event.request);
        return response;
      } catch (error) {
        return cache.match(OFFLINE_URL);
      }
    })()
  );
});

// Manejo de actualizaciones
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});