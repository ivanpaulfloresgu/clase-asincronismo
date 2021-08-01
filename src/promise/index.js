/**
 *Aqui la promesa no se ejecuta hasta que se llame a la funcion
 */
const somethingWillHapped = () => {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve("Hey!");
    } else {
      reject("Whoops!");
    }
  });
};

somethingWillHapped()
  .then(response => console.log(response))
  .catch(err => console.error(err));

const somethingWillHapped2 = () => {
  return new Promise((resolve, reject) => {
    if (true) {
      setTimeout(() => {
        resolve('True');
      }, 2000)
    } else {
      const error = new Error('Whooops!');
      reject(error);
    }
  });
}

somethingWillHapped2()
  .then(response => console.log(response))
  .catch(err => console.error(err));


Promise.all([somethingWillHapped(), somethingWillHapped2()])
  .then(response => {
    console.log('Array of results', response);
  })
  .catch(err => {
    console.error(err);
  })