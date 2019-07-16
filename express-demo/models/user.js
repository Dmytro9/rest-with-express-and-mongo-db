const mongoose = require("mongoose")
const Joi = require("joi")


// Schema
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 1024
        },
    })
)


function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    };

    return Joi.validate(user, schema);
}

exports.User = User
exports.validate = validateUser