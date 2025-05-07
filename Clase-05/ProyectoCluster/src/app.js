import cluster from 'cluster';
import { cpus } from 'os';
import express from 'express';

const numeroDeProcesadores = cpus().length;
console.log("Numero de procesadores: "+numeroDeProcesadores);

if(cluster.isPrimary){
    console.log(`Soy el proceso primario ${process.pid} y voy a generar ${numeroDeProcesadores} trabajadores`);
    for(let i = 0; i < numeroDeProcesadores; i++){
        cluster.fork();
    }

    cluster.on('message', (worker, message) => {
        console.log(`Mensaje recibido desde el worker ${worker.process.pid}: ${message}`);
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork(); //Lo reemplazamos
    });

}else{
    console.log(`Soy el proceso trabajador ${process.pid}, un proceso forkeado del primario`);
    
    const app = express();

    app.get('/', (req, res) => {
      res.send({ status: 'success', message: 'Petición atendida por un proceso worker' });
    });
  
    //una operación sencilla
    app.get('/operacionSencilla', (req, res) => {
        let sum = 0;
        for(let i = 0; i < 1000000; i++){
            sum += i;
        }
        res.send({ status: 'success', message: `El worker ${process.pid} ha atendido esta petición, el resultado es ${sum}` });
    });

    //una operación compleja
    app.get('/operacionCompleja', (req, res) => {
        let sum = 0;
        for(let i = 0; i < 5e8; i++){
            sum +=i;
        }
        res.send({ status: 'success', message: `El worker ${process.pid} ha atendido esta petición, el resultado es ${sum}` });
    });

    app.listen(8080, () => console.log(`Listening on 8080`));
}
