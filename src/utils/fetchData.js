// modulo para hacer las peticiones
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// funcion principal
const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    // instanciamos la conexion
    const xhttp = new XMLHttpRequest();
    // abrir una conexion con el metodo, la ruta y si es asincrono
    xhttp.open("GET", url_api, true);
    // validacion del llamado
    xhttp.onreadystatechange = () => {
      // comparamos el 4 porque eso indica que se completo la peticion
      if (xhttp.readyState === 4) {
        // verificamos que el status este en 200, 200 es que es correcto
        xhttp.status === 200
          ? // si esta en 200
            resolve(JSON.parse(xhttp.responseText))
          : // si no esta en 200
            reject(new Error("Error " + url_api));
      }
    };
    // por ultimo enviamos la peticion
    xhttp.send();
  });
};

// exportamos la funcion
module.exports = fetchData;
