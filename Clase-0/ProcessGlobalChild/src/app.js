import express from 'express';
import { fork } from 'child_process';

const app = express();
let visitas = 0;

app.use('/', (req, res, next) =>{
    visitas++;
    console.log('Visitas: '+visitas);
    next();
})

function operacionCompleja() {
  let result = 0;
  for (let i = 0; i < 5e9; i++) {
    result += i;
  }
  return result;
}

app.get('/calculo-bloq', (req, res) => {
  const result = operacionCompleja();
  res.send(`El resultado de la operación es ${result}`);
});

app.get('/calculo-nobloq', (req, res) => {
   const child = fork('./suma.js'); //Creamos el proceso hijo

   child.send("Inicia el cálculo, por favor"); //Enviamos un mensaje al proceso hijo (opional)

    child.on('message', result => {//Esperando la respuesta del proceso hijo
    res.send("El resultado es :"+result)
    })
});

app.get('/bienvenida', (req, res) => {
    res.send(`Bienvenida`);
  });

app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));