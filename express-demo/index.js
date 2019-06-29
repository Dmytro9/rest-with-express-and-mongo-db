const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require("joi");
const express = require("express");
const log = require('./logger');
const app = express();


// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.set('view engine', 'pug');
app.set('views', './views');


app.use(express.json()); // req.body

app.use(express.urlencoded({
    extended: true
})); // key=value&key=value

app.use(express.static('public'));

app.use(helmet());


console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('dev'));
    console.log('Morgan enabled...');
}



app.use(log);
app.use((req, res, next) => {
    console.log("Auth...");
    next();
});

const courses = [{
        id: 1,
        name: "course1"
    },
    {
        id: 2,
        name: "course2"
    },
    {
        id: 3,
        name: "course3"
    }
];

app.get("/", (req, res) => {
    res.render('index', {
        title: 'My Express App',
        message: 'Hello'
    });
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(item => item.id === id);
    if (!course)
        return res.status(404).send(`The course with the given ID ${id} not found`);

    res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.params);
});

app.post("/api/courses", (req, res) => {
    const {
        error
    } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(item => item.id === id);
    if (!course)
        return res.status(404).send(`The course with the given ID ${id} not found`);

    const {
        error
    } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string()
            .min(3)
            .required()
    };

    return Joi.validate(course, schema);
}

app.delete("/api/courses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(item => item.id === id);

    if (!course)
        return res.status(404).send(`The course with the given ID ${id} not found`);

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));