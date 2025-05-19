import mongoose from 'mongoose';
import User from '../src/dao/Users.dao.js';
import Assert from 'assert';

mongoose.connect(`mongodb+srv://coderuser:Hsiu8LrVRlpeSzAI@cluster0.b6out72.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

const assert = Assert.strict;

describe('Testing Users DAO', function(){
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
    it('El get debe devolver un arreglo', async function(){ //el callback es justamente el entorno que queremos ejecutar y validar el test
        //console.log(this.userDao);
        //Este entorno es aislado, por lo que no afecta al resto de los tests
        const result = await this.userDao.get();
        assert.strictEqual(Array.isArray(result), true);
    })
    it('El DAO debe agregar un usuario correctamente a la base de datos', async function(){ 
        const result = await this.userDao.save(this.mockUser);
        //assert.ok evalua si el parámetro es truthy
        assert.ok(result._id);
    })
    it('El DAO debe agregar al documento insertado un arreglo de mascota vacío por defecto', async function(){ 
        const result = await this.userDao.save(this.mockUser);
        //assert.deepStrictEqual hace referencia a una comparación interna
        //Si usamos strictEqual,  va a dar error por va a validar las referencias, y justamente son distintas
        assert.deepStrictEqual(result.pets, []);
    })
    it('El Dao puede obtener a un usuario a partir de su email', async function(){ 
        const result = await this.userDao.save(this.mockUser);

        const user = await this.userDao.getBy({ email: this.mockUser.email}).lean();
        
        assert.strictEqual(typeof user, 'object');
        assert.strictEqual(user.first_name, this.mockUser.first_name);
    })
})