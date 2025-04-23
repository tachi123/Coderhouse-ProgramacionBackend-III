//Si ejecutamos node Process.js 1 dev 2

console.log(process.argv); //Imprime todos los argumentos enviados al iniciar la ejecución de nuestro programa

console.log(process.argv.slice(3)) //Imprimiria el entorno que tengo que utilizar, en este caso dev
