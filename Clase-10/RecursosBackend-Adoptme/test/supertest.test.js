import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8081');

describe('Testing de integración Adoptme', () => {
    let createdPetId; //Variable para almacenar el ID de la mascota creada para pruebas en PUT y DELETE
    describe('Test POST /api/pets', () => {
        it('Debe crear una mascota correctamente con la propiedad adopted:false', async()=>{
            const petMock = {
                name: "Patitas",
                specie: "Pez",
                birthDate: "10-10-2022",
            };
            const {
                statusCode,
                ok,
                _body
            } = await requester.post('/api/pets').send(petMock);

            //console.log(statusCode);
            //console.log(ok);
            //console.log(_body);

            //Si el payload tiene un _id, significa que la creación en la bd fue exitosa
            expect(_body.payload).to.have.property('_id');
            expect(_body.payload).to.have.property('adopted', false);

            createdPetId = _body.payload._id;
        }) 
        it('Debe responder con 400 si se intenta crear una mascota sin nombre', async()=>{
            const petMock = {
                specie: "Pez",
                birthDate: "10-10-2022",
            };
            const {
                statusCode,
                ok,
                _body
            } = await requester.post('/api/pets').send(petMock);
            expect(statusCode).to.equal(400);
        })
    })
    describe('Test GET /api/pets', () => {
        it('Debe devolver un arreglo en el payload con status success', async()=>{
            const {
                statusCode,
                ok,
                _body
            } = await requester.get('/api/pets');
            expect(statusCode).to.equal(200);
            expect(_body.payload).to.be.an('array');
        })  
    })
    describe('Test PUT /api/pets/:pid', () => {
        it('Debe actualizar correctamente una mascota existente', async()=>{
            const updatePet = { name: 'Luna nueva' }
            const {
                statusCode,
                ok,
                _body
            } = await requester.put(`/api/pets/${createdPetId}`,updatePet);
            expect(statusCode).to.equal(200);
        })  
    })
    describe('Test DELETE /api/pets/:pid', () => {
        it('Debe borrar correctamente una mascota existente', async()=>{
            const {
                statusCode,
                ok,
                _body
            } = await requester.delete(`/api/pets/${createdPetId}`);
            expect(statusCode).to.equal(200);
        })
        it('Debe arrojar error si la mascota no existe', async()=>{
            const {
                statusCode,
                ok,
                _body
            } = await requester.delete(`/api/pets/asdf2412321a`);
            expect(statusCode).to.equal(400);
        })  
    })
})