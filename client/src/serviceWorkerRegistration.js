// Comprueba si los Service Workers están disponibles en el navegador
// if ("serviceWorker" in navigator) {
//   // Si los Service Workers están disponibles, espera a que la página esté completamente cargada
//   window.addEventListener("load", function () {
//     // Intenta registrar el Service Worker
//     navigator.serviceWorker.register("/serviceWorker.js").then(
//       // Esta función se ejecuta si la instalación del Service Worker tiene éxito
//       function (registration) {
//         // Registra el éxito en la consola
//         console.log(
//           "ServiceWorker registration successful with scope: ",
//           registration.scope
//         );
//       },
//       // Esta función se ejecuta si la instalación del Service Worker falla
//       function (err) {
//         // Registra el error en la consola
//         console.log("ServiceWorker registration failed: ", err);
//       }
//     );
//   });
// }