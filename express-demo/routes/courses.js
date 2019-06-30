const express = require('express');
const Joi = require("joi");
const router = express.Router();

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

router.get("/", (req, res) => {
    res.send(courses);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(item => item.id === id);
    if (!course)
        return res.status(404).send(`The course with the given ID ${id} not found`);

    res.send(course);
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(item => item.id === id);

    if (!course)
        return res.status(404).send(`The course with the given ID ${id} not found`);

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});


module.exports = router;