let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

let {StudentList} = require('./model');

let app = express();

app.use(express.static('public'));
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
    return res.status(200).json(estudiantes);
});

app.get('/api/getById', (req, res) => {
    let id = req.query.id;
    let result = estudiantes.find((el) => {
        if (el.matricula == id)  {
            return el;
        }
    });

    if (result) {
        return res.status(200).json(result);
    } else {
        res.statusMessage = "El alumno no se encuentra en la lista";
        return res.status(404).send();
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
        return res.status(200).json(result);
    } else {
        res.statusMessage = "El alumno no se encuentra en la lista";
        return res.status(404).send();
    }
});

app.post('/api/newStudent', jsonParser, (req, res) => {
    let nombre, matricula, apellido;
    if (req.body.nombre == undefined) {
        res.statusMessage("Sin nombre");
        return res.status(406).json({});
    }
    if (req.body.matricula == undefined) {
        res.statusMessage("Sin matricula");
        return res.status(406).json({});
    }
    if (req.body.apellido == undefined) {
        res.statusMessage("Sin apellido");
        return res.status(406).json({});
    }
    nombre = req.body.nombre;
    apellido = req.body.apellido;
    matricula = req.body.matricula;

    let result = estudiantes.find((el) => {
        if (el.matricula === matricula) {
            return el;
        }
    });

    if (result != undefined) {
        res.statusMessage("Matricula ya existe");
        return res.status(409).json({});
    }

    let nuevoEstudiante = {
        nombre: nombre,
        apellido: apellido,
        matricula: matricula
    }

    estudiantes.push(nuevoEstudiante);

    return res.status(201).json(nuevoEstudiante);
});

app.put('/api/updateStudent/:id', jsonParser, (req, res) => {
    let nombre, matricula, apellido;
    if (req.body.matricula == undefined) {
        res.statusMessage = "Sin matricula";
        return res.status(406).json({});
    }

    matricula = req.body.matricula;
    
    if (req.body.nombre != undefined) {
        nombre = req.body.nombre;
    }
    if (req.body.apellido != undefined) {
        apellido = req.body.apellido;
    }

    if (nombre == undefined && apellido == undefined) {
        res.statusMessage = "Sin nombre o apellido";
        return res.status(406).json({});
    }

    if (matricula != req.params.id) {
        res.statusMessage = "Id y matricula no coinciden";
        return res.status(409).json({});
    }

    let found = false;
    let modified;

    estudiantes.forEach((el) => {
        if (el.matricula === matricula) {
            if (nombre != undefined) {
                el.nombre = nombre;
            }
            if (apellido != undefined) {
                el.apellido = apellido;
            }
            modified = el;
            found = true;
        }
    });

    if (found) {
        return res.status(202).json(modified);
    } else {
        res.statusMessage = "Matricula no existe";
        res.status(404).json({});
    }

});

app.delete('/api/deleteStudent', jsonParser, (req, res) => {
    let matricula;
    if (req.body.matricula == undefined) {
        res.statusMessage = "Sin matricula";
        res.status(406).json({});
    }

    matricula = req.body.matricula;

    if (req.query.id != matricula) {
        res.statusMessage = "Matriculas no coinciden";
        res.status(409).json({});
    }

    let idx;

    let result = estudiantes.find((el, i) => {
        if (el.matricula === matricula) {
            idx = i;
            return el;
        }
    })

    if (result != undefined) {
        estudiantes.splice(idx, 1);
        return res.status(204).json({});
    } else {
        res.statusMessage = "Matricula no existe";
        res.status(404).json({});
    }
});

app.listen(8080, () => {
    console.log("Servidor corriendo en el puerto 8080");
});