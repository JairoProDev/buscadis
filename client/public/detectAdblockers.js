// Este archivo contiene la lógica para detectar si el señuelo se cargó.
function checkForAdblocker() {
  if (typeof adblockTest === 'undefined') {
    // El señuelo no se cargó, así que presumiblemente hay un adblocker activo.
    const root = document.getElementById('root');
    root.innerHTML = 'Parece que estás utilizando un bloqueador de anuncios. Por favor, desactívalo para ver esta aplicación.';
    root.style.color = 'red'; // Cambia el color del texto a rojo
  }
}

window.onload = checkForAdblocker;