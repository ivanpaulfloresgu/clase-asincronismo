// Implementación de una API con XMLHttpRquest

// Importamos el modulo para hacer las peticiones
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// direccion de la API
let api = 'https://rickandmortyapi.com/api/character/';

// funcion principal
function fetchData(url_api, callback) {
  // instanciamos la conexion
  let xhttp = new XMLHttpRequest();
  /* 
    A nuestra referencia xhttp le pasamos un LLAMADO 'open'
    donde: parametro1 = el metodo, parametro2 = la url,
    parametro3 = verificación si es asincrono o no, valor por defecto true
    */
  xhttp.open("GET", url_api, true);
  //Cuando el estado del objeto cambia, ejecutar la función:
  xhttp.onreadystatechange = function (event) {
    /*
        los estados que puede tener son:
        estado 0: inicializado // request not initialized
        estado 1: cargando // server connection established
        estado 2: ya se cargó // request received
        estado 3: ya hay información // processing request
        estado 4: solicitud completa // request finished and response is ready
        PD: recuerda estas trabajando con una API externa osea un servidor por lo que
        depende del servidor cuanto demore en cada estado haces un pedido por datos
        (request) y solo es aplicar lógica.
        */
    if (xhttp.readyState === 4) {
      //Verificar estado, aqui un resumen de los casos mas comunes:
      /*
            ESTADO 1xx (100 - 199): Indica que la petición esta siendo procesada.
            ESTADO 2xx (200 - 299): Indica que la petición fue recibida, aceptada y procesada correctamente.
            ESTADO 3xx (300 - 399): Indica que hay que tomar acciones adicionales para completar la solicitud. Por lo general indican redireccionamiento.
            ESTADO 4xx (400 - 499): Errores del lado del cliente. Indica se hizo mal la solicitud de datos.
            ESTADO 5xx (500 - 599): Errores del Servidor. Indica que fallo totalmente la ejecución.
            */
      if (xhttp.status === 200) {
        //Estandar de node con callbacks, primer parametro error, segundo el resultado
        callback(null, JSON.parse(xhttp.responseText));
      } else {
        // si no es 200
        const error = new Error("Error " + url_api);
        // matamos el proceso con un error
        return callback(error, null);
      }
    }
  };
  //Envio de la solicitud.
  xhttp.send();
}

// primero buscamos la lista de personajes
fetchData(api, (error1, data1) => {
  // si error, matamos retornando un error
  if(error1) return console.error(error1);
  // luego buscamos en la api el id de Rick
  fetchData(api + data1.results[0].id, (error2, data2) => {
    // si error, matamos retornando un error
    if(error2) return console.error(error2);
    // por ultimo la consulta a la api que contiene su dimension
    fetchData(data2.origin.url, (error3, data3) => {
      // si error, matamos retornando un error
      if (error3) return console.error(error3);

      // mostramos los resultados :)
      console.log(data1.info.count);
      console.log(data2.name);
      console.log(data3.dimension);

      // rutas de las peticiones en orden
      console.log(api);
      console.log(api + data1.results[0].id);
      console.log(data2.origin.url);
    });
  });
});