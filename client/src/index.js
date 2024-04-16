// Importa el objeto React, que es necesario para escribir componentes de React
import React from "react";
// Importa la función createRoot de react-dom/client, que se utiliza para renderizar componentes de React
import { createRoot } from "react-dom/client";
// Importa el archivo CSS global
import "./index.css";
// Importa el componente App, que es el componente raíz de la aplicación
import App from "./App";
// Importa la función reportWebVitals, que se utiliza para medir el rendimiento de la aplicación
import reportWebVitals from "./reportWebVitals";

// Espera a que el DOM esté completamente cargado antes de renderizar la aplicación
document.addEventListener("DOMContentLoaded", () => {
  // Crea una raíz de React en el elemento con el ID "root"
  const root = createRoot(document.getElementById("root"));

  // Renderiza el componente App dentro de la raíz de React
  root.render(
    // React.StrictMode es un componente de ayuda que comprueba problemas potenciales en la aplicación durante el desarrollo
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

// Comprueba si los Service Workers están disponibles en el navegador
if ("serviceWorker" in navigator) {
  // Si los Service Workers están disponibles, espera a que la página esté completamente cargada
  window.addEventListener("load", function () {
    // Intenta registrar el Service Worker
    navigator.serviceWorker.register("/serviceWorker.js").then(
      // Esta función se ejecuta si la instalación del Service Worker tiene éxito
      function (registration) {
        // Registra el éxito en la consola
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      // Esta función se ejecuta si la instalación del Service Worker falla
      function (err) {
        // Registra el error en la consola
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

// Llama a la función reportWebVitals, que se utiliza para medir el rendimiento de la aplicación
reportWebVitals();