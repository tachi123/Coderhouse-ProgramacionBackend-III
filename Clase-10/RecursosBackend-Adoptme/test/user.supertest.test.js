import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8081');

describe('Test avanzados de Adoptme', () => {
    describe('Test de interacción con la entidad User', () => {
        let cookie;
        let userIdCreated;
        let emailPrueba = "example13@example.org";
        after(async function() {
            //Después de todo el test, borro al usuario de la BD
            await requester.delete(`/api/user/${userIdCreated}`);
        })
        it('Debe registrar correctamente un usuario', async()=>{
            const mockUser = {
                first_name: "Nahuel",
                last_name: "Ramirez",
                email: emailPrueba,
                password: "123"
            }
            const { _body } = await requester.post('/api/sessions/register').send(mockUser);
            //Solo nos basta que esté definido el payload indicando que tienen un _id registrado
            expect(_body.payload).to.be.ok; //En el payload viene solamente el _id
            userIdCreated = _body.payload;
        }) 
        it('Debe loguear correctamente al usuario y DEVOLVER una COOKIE', async()=>{
            const mockUser = { //Las mismas credenciales que el usuario creado previamente
                email: emailPrueba,
                password: "123"
            }
            /*
                No solo vamos a trabajar con el body, si no también con los headers. Si viene correctamente
                guardamos el valor de la cookie 
            */
            const result = await requester.post('/api/sessions/login').send(mockUser);
            const cookieResult = result.headers['set-cookie'][0]
            expect(cookieResult).to.be.ok;
            cookie = { // cookieResult = 'coderCookie=JWT'
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }
            expect(cookie.name).to.be.ok.and.eql('coderCookie');
            expect(cookie.value).to.be.ok;
        })
        it('Debe enviar la cookie que contiene el usuario y desestructurar éste correctamente', async()=>{
            //Enviamos la cookie que guardamos
            const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
        
            expect(_body.payload.email).to.be.eql(emailPrueba)
        })
    })
})