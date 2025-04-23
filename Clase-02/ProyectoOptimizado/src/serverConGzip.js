import express from 'express';
import compression from 'express-compression';

const app = express();
app.use(compression());

app.get('/stringridiculamentelarga', (req, res) => {
    let string = 'Hola Coders, soy una string ridiculamente larga';
    for(let i = 0; i < 100000; i++) {
        string += 'Hola Coders, soy una string ridiculamente larga';
    }
    res.send(string);
})

const server = app.listen(8080, () => console.log("Listening on PORT 8080"));