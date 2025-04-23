import {Command} from 'commander';

const program = new Command(); //Inicializamos un nuevo comando de commander

program
    .option('-m, --mode <mode>','Modo de trabajo','prod')
    .option('-p, --port <port>','Puerto del servidor','8080')
    .requiredOption('-u <user>','Usuario administrador','No se detecto ningun usuario')

program.parse(); //Se utiliza para cerrar la configuración de comandos

const options = program.opts();
console.log("Option for Modo de trabajo: "+ options.mode);
console.log("PORT: "+ options.port);
console.log("USER: "+ options.user);
console.log("Remainning arguments: "+program.args);