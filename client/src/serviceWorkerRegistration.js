let isRefreshing = false;

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/serviceWorker.js');
        
        // Detectar nuevas versiones
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Nueva versión disponible
              showUpdateNotification(registration);
            }
          });
        });

        // Recargar cuando el nuevo SW tome el control
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!isRefreshing) {
            isRefreshing = true;
            window.location.reload();
          }
        });

      } catch (error) {
        console.error('Error al registrar el Service Worker:', error);
      }
    });
  }
}

function showUpdateNotification(registration) {
  const shouldUpdate = window.confirm(
    'Hay una nueva versión disponible. ¿Desea actualizar ahora?'
  );

  if (shouldUpdate) {
    registration.waiting.postMessage('SKIP_WAITING');
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error('Error al desregistrar el Service Worker:', error);
      });
  }
}