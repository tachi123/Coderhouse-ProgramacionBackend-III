import dotenv from 'dotenv';
import {Command} from 'commander';

const program = new Command(); //Inicializamos un nuevo comando de commander

program
    .option('-m, --mode <mode>','Modo de trabajo','prod')
    .option('-p, --port <port>','Puerto de ejecucion','8080');
program.parse(); //Se utiliza para cerrar la configuración de comandos

const options = program.opts();

const environment = options.mode;
const port = options.port;

dotenv.config({
    path: environment === 'prod' ? './.env.prod' : './.env.dev'
});

export default {
    port: process.env.PORT || port,
    secret_key: process.env.SECRET_KEY,
    jwt_secret: process.env.JWT_SECRET,
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,
    mongo_uri: process.env.MONGO_URI,
}