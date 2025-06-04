//Teast unitarios para el controlador de usuarios
import chai from 'chai';
import sinon from 'sinon';

import usersController from '../src/controllers/users.controller.js';
import { usersService } from '../src/services/index.js';

const expect = chai.expect;

describe('User Controller', () => {
    afterEach(() => {
        // Limpiar los stubs después de cada prueba
        sinon.restore();
    });
    it('getAllUsers debe devolver todos los usuarios', async () => {

        // Simulamos el servicio de usuarios con datos falsos usando Sinon
        // Aquí puedes definir los datos falsos que quieres devolver
        const fakeUsers = [ { id: 1, name: 'John Doe', age: 19 }, { id: 2, name: 'Jane Doe' , age: 21 } ];
        // Simula el método getAll del servicio de usuarios para no depender de dependencias externas
        sinon.stub(usersService, 'getAll').resolves(fakeUsers); 
        const req = {};
        // Espiar la función de respuesta para verificar que se llama correctamente, cuantas veces y con qué argumentos fue llamado
        const res = {send: sinon.spy()};

        await usersController.getAllUsers(req, res);
        
        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal({ status: 'success', payload: fakeUsers });
    });
});
