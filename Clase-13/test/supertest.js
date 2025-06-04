import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Test de integración con Supertest", () => {

    it("GET /api/users debe devolver todos los usuarios", async () => {
        const response = await request.get("/api/users");
        
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status", "success");
        expect(response.body.payload).to.be.an("array");
    });
    it("GET /api/users/:uid debe devolver un usuario por ID", async () => {
        const userId = "12345"; // Reemplaza con un ID de usuario válido
        const response = await request.get(`/api/users/${userId}`);
        
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status", "success");
        expect(response.body.payload).to.have.property("id", userId);
    });
    it("POST /sessions/register debe registrar un nuevo usuario", async () => {
        const newUser = {
            first_name: "Test",
            last_name: "User",
            email: "aasdf@asdf.com",
            password: "password123"
        } 
        const response = await request.post("/api/sessions/register").send(newUser);
        expect(response.status).to.equal(200);  
        expect(response.body).to.have.property("status", "success");
    });
});