const mongoose = require("mongoose")
const Joi = require("joi")
const {
    genreSchema
} = require('./genre')

// Schema
const Movie = mongoose.model(
    "Movie",
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 255
        },
        numberInStock: {
            type: Number,
            required: true,
            min: 0,
            max: 255
        },
        dailyRentalRate: {
            type: Number,
            required: true,
            min: 0,
            max: 255
        },
        genre: {
            type: genreSchema,
            required: true
        }
    })
)


function validateMovie(genre) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi().number().min(0).require()
    };

    return Joi.validate(genre, schema);
}

exports.Movie = Movie
exports.validate = validateMovie