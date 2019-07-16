const mongoose = require("mongoose");
const Joi = require("joi")

// embedded collection with some embedded props
const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({ // not already defined customerSchema (but only necessarily props)
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            },
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now,
    },
    dateReturned: {
        type: Date,
    },
    rentalFree: {
        type: Number,
        min: 0
    },
})


const Rental = mongoose.model("Rental", rentalSchema);


function validateRental(rental) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
        rentalFree: Joi.number()
    };

    return Joi.validate(rental, schema);
}

exports.Rental = Rental
exports.rentalSchema = rentalSchema
exports.validate = validateRental