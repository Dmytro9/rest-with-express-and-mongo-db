const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [{
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    },
];


app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(item => item.id === id);
    if (!course) {
        res.status(404).send(`The course with the given ID ${id} not found`);
        return;
    }
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

app.post('/api/courses', (req, res) => {
    const {
        error
    } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(item => item.id === id);
    if (!course) {
        res.status(404).send(`The course with the given ID ${id} not found`);
        return;
    }

    const {
        error
    } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
};


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));