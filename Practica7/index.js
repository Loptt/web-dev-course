let express = require('express');
let morgan = require('morgan');

let app = express();

app.use(morgan('dev'));

let estudiantes = [{
    nombre: "Miguel",
    apellido: "Angeles",
    matricula: 1730939
},
{
    nombre: "Erick",
    apellido: "Gonzalez",
    matricula: 1039859
},
{
    nombre: "Victor",
    apellido: "Villarreal",
    matricula: 1039863
},
{
    nombre: "Victor",
    apellido: "Cardenas",
    matricula: 816350
}];

app.get('/api/students', (req, res) => {
    res.status(200).json(estudiantes);
});

app.get('/api/getById', (req, res) => {
    let id = req.query.id;
    let result = estudiantes.find((el) => {
        if (el.matricula == id)  {
            return el;
        }
    });

    if (result) {
        res.status(200).json(result);
    } else {
        res.statusMessage = "El alumno no se encuentra en la lista";
        res.status(404).send();
    }
});

app.get('/api/getByName/:name', (req, res) => {
    let name = req.params.name;
    let result = estudiantes.filter((el) => {
        if (el.nombre === name) {
            return el;
        }
    });

    if (result.length > 0) {
        res.status(200).json(result);
    } else {
        res.statusMessage = "El alumno no se encuentra en la lista";
        res.status(404).send();
    }
});

app.listen(8080, () => {
    console.log("Servidor corriendo en el puerto 8080");
});