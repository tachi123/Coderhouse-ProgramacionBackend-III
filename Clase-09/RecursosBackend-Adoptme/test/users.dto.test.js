import { createHash, passwordValidation } from '../src/utils/index.js';
import chai from 'chai';

const expect = chai.expect;

describe('Testing de utilidades y DTO de usuario', () => {

    describe('Testing de contraseñas', () => {
        it('Debe comparar la contraseña hasheada con la original', ()=> {
            const mockUser = {
                first_name: "Coder",
                last_name: "House",
                email: "example123@example.com",
                password: 'PasswordDificil',
            }
            const hashedPassword = createHash(mockUser.password);
        
            const match = passwordValidation(user, hashedPassword);
            expect(match).to.be.true;
        })
        it('Debe fallar si la contraseña hasheada fue alterada', ()=> {
            const mockUser = {
                first_name: "Coder",
                last_name: "House",
                email: "example123@example.com",
                password: 'PasswordDificil',
            }
            const hashedPassword = createHash(mockUser.password).slice(0,-1) + 'X';
        
            const match = passwordValidation(user, hashedPassword);
            expect(match).to.be.false;
        })
    });

});