// Este archivo contiene la lógica para detectar si el señuelo se cargó.

// Definimos una función llamada checkForAdblocker
function checkForAdblocker() {
  // Comprobamos si la variable adblockTest es indefinida. Esta variable se define en un archivo externo que los bloqueadores de adisos suelen bloquear.
  // Si la variable es indefinida, eso significa que el archivo externo no se cargó, lo que a su vez significa que probablemente hay un bloqueador de adisos activo.
  if (typeof adblockTest === "undefined") {
    // Si detectamos un bloqueador de adisos, obtenemos una referencia al elemento con id 'root' en el DOM.
    const root = document.getElementById("root");
    // Cambiamos el contenido HTML del elemento root para mostrar un mensaje al usuario pidiéndole que desactive su bloqueador de adisos.
    root.innerHTML = `
      <div style="text-align: center; padding: 20px; background-color: #ffdddd; border: 1px solid #ff0000; color: #ff0000;">
        <h2>Bloqueador de adisos detectado</h2>
        <p>Parece que estás utilizando un bloqueador de adisos. Por favor, desactívalo para ver los adisos clasificados en esta aplicación.</p>
        <p>Para desactivar el bloqueador de adisos:</p>
        <ul style="text-align: left; display: inline-block;">
          <li>Haz clic en el icono del bloqueador de adisos en la barra de herramientas de tu navegador.</li>
          <li>Selecciona "No ejecutar en páginas de este dominio" o una opción similar.</li>
          <li>Recarga la página.</li>
        </ul>
      </div>
    `;
  }
}

// Asignamos la función checkForAdblocker al evento onload del objeto window.
// Esto significa que la función se ejecutará automáticamente cuando se haya terminado de cargar la página.
window.onload = checkForAdblocker;
