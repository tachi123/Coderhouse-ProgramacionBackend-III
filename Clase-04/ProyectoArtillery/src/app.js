import express from 'express';

const app = express();

//una operación sencilla
app.get('/operacionSencilla', (req, res) => {
    let sum = 0;
    for(let i = 0; i < 1000000; i++){
        sum += i;
    }
    res.send(sum);
});

//una operación compleja
app.get('/operacionCompleja', (req, res) => {
    let sum = 0;
    for(let i = 0; i < 5e8; i++){
        sum +=i;
    }
    res.send(sum);
});

app.listen(8080, () => console.log("Listening"));

/** Test de stress con Artillery
 * 
 * Instalación
 * 
 * npm install -g artillery
 * 
 * Ejecutamos pruebas: 
 * artillery quick --count 40 --num 50 "http://localhost:8080/operacionSencilla" -o simple.json  
 * artillery quick --count 40 --num 50 "http://localhost:8080/operacionCompleja" -o complejo.json 
 */
