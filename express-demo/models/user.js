const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require('jsonwebtoken')
const config = require('config')


// Schema
const userSchema = new mongoose.Schema({
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
    isAdmin: Boolean,
    // roles: [],
    // operations: []
})

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin
    }, config.get('jwtPrivateKey'))
}

const User = mongoose.model("User", userSchema)

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        isAdmin: Joi.boolean(),
    };

    return Joi.validate(user, schema);
}

exports.User = User
exports.validate = validateUser