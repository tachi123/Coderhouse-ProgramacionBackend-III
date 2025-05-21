import chai from 'chai';
import mongoose from 'mongoose';
import User from '../src/dao/Users.dao.js';
import Assert from 'assert';

mongoose.connect(`mongodb+srv://coderuser:Hsiu8LrVRlpeSzAI@cluster0.b6out72.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

//Creamos la variable expect que vamos a utilizar ahora para las comparaciones
const expect = chai.expect;

describe('Testing Users DAO con CHAI', function(){
    before(function() {
        this.userDao = new User();
        this.mockUser = {
            first_name: "Coder",
            last_name: "House",
            email: "example123@example.com",
            password: "123",
        }
    })
    beforeEach(function() {
        mongoose.connection.collections.users.drop();
        this.timeout(5000); // por defecto son 2 segundos
    })
    it('El get debe devolver un arreglo', async function(){
        const result = await this.userDao.get();

        expect(result).to.be.an('array');
    })
    it('El DAO debe agregar un usuario correctamente a la base de datos', async function(){ 
        const result = await this.userDao.save(this.mockUser);
        expect(result).to.have.property('_id');
    })
    it('El DAO debe agregar al documento insertado un arreglo de mascota vacío por defecto', async function(){ 
        const result = await this.userDao.save(this.mockUser);
        expect(result.pets).to.deep.equal([]);
    })
    it('El Dao puede obtener a un usuario a partir de su email', async function(){
        const result = await this.userDao.save(this.mockUser);
        const user = await this.userDao.getBy({ email: result.email});

        expect(user).to.be.an('object');
        expect(user)
            .to.have.property('first_name')
            .that.equals(this.mockUser.first_name);
    })
})