// Este archivo contiene la lógica para detectar si el señuelo se cargó.

// Definimos una función llamada checkForAdblocker
function checkForAdblocker() {
  // Comprobamos si la variable adblockTest es indefinida. Esta variable se define en un archivo externo que los bloqueadores de anuncios suelen bloquear.
  // Si la variable es indefinida, eso significa que el archivo externo no se cargó, lo que a su vez significa que probablemente hay un bloqueador de anuncios activo.
  if (typeof adblockTest === 'undefined') {
    // Si detectamos un bloqueador de anuncios, obtenemos una referencia al elemento con id 'root' en el DOM.
    const root = document.getElementById('root');
    // Cambiamos el contenido HTML del elemento root para mostrar un mensaje al usuario pidiéndole que desactive su bloqueador de anuncios.
    root.innerHTML = 'Parece que estás utilizando un bloqueador de anuncios. Por favor, desactívalo para ver los avisos clasificados en esta aplicación.';
    // Cambiamos el color del texto del mensaje a rojo para llamar la atención del usuario.
    root.style.color = 'red';
  }
}

// Asignamos la función checkForAdblocker al evento onload del objeto window.
// Esto significa que la función se ejecutará automáticamente cuando se haya terminado de cargar la página.
window.onload = checkForAdblocker;

// En este código, estamos creando una función llamada checkForAdblocker que se encarga de detectar si el usuario tiene un bloqueador de anuncios activo en su navegador. Esto es importante porque los bloqueadores de anuncios pueden afectar negativamente la funcionalidad de la aplicación web que en si su contenido principal son anuncios.

// El proceso de detección se realiza verificando si la variable adblockTest está definida. Esta variable se define en un archivo externo que los bloqueadores de anuncios suelen bloquear. Si la variable es indefinida, significa que el archivo externo no se cargó, lo que a su vez indica que probablemente hay un bloqueador de anuncios activo.

// Si detectamos un bloqueador de anuncios, realizamos dos acciones. Primero, obtenemos una referencia al elemento en el DOM con el id 'root'. Luego, cambiamos el contenido HTML de ese elemento para mostrar un mensaje al usuario solicitándole que desactive su bloqueador de anuncios. Además, cambiamos el color del texto del mensaje a rojo para llamar la atención del usuario.

// Esta detección y notificación son importantes porque permiten informar al usuario sobre la presencia de un bloqueador de anuncios y solicitarle que lo desactive para poder disfrutar de la funcionalidad completa de la aplicación. Sin esta detección, el usuario podría encontrarse con problemas o limitaciones en la aplicación sin saber la causa.

// Es importante tener en cuenta que esta implementación específica asume que la variable adblockTest se define en un archivo externo que los bloqueadores de anuncios suelen bloquear. Si esa no es la forma en que se detecta un bloqueador de anuncios en la aplicación, es posible que necesitemos ajustar el código en consecuencia.