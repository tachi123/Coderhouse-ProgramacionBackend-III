import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8081');

describe('Test uploads', () => {
    it('Debe poder crear una mascota con la ruta de la imagen', async () => {
        const mockPet = {
            name: "Patitas",
            specie: "Pez",
            birthDate: "10-10-2022"
        }
        const result = await requester.post('/api/pets/withimage')
            .field('name', mockPet.name)
            .field('specie', mockPet.specie)
            .field('birthDate', mockPet.birthDate)
            .attach('image','./test/coderDog.jpg');

            expect(result.status).to.be.eql(200);
            expect(result._body.payload).to.have.property('_id');
            expect(result._body.payload.image).to.be.ok;
    })
})