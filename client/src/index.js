// Importa el objeto React, que es necesario para escribir componentes de React
import React from "react";
// Eliminar importaciones no utilizadas
// import ReactDOM from 'react-dom';

// Importa la función createRoot de react-dom/client, que se utiliza para renderizar componentes de React
import { createRoot } from "react-dom/client";
// Importa el archivo CSS global
import "./index.css";
// Importa el componente App, que es el componente raíz de la aplicación
import App from "./App";
// Importa la función reportWebVitals, que se utiliza para medir el rendimiento de la aplicación
import reportWebVitals from "./reportWebVitals";
// Importa el archivo de registro del Service Worker
import './serviceWorkerRegistration';

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

// Llama a la función reportWebVitals, que se utiliza para medir el rendimiento de la aplicación
reportWebVitals();

// https://create-react-app.dev/docs/making-a-progressive-web-app  -  Para seguir mejorando la PWA.