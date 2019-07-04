const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

// Schema
const Customers = mongoose.model(
    "Customers",
    new mongoose.Schema({
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
    })
);

// Get All
router.get("/", async (req, res) => {
    const customer = await Customers.find().sort("name");
    res.send(customer);
});

// Get one by id
router.get("/:id", async (req, res) => {
    const customer = await Customers.findById(req.params.id);

    if (!customer)
        return res.status(404).send(`The customer with the given ID ${id} not found`);

    res.send(customer);
});

// POST
router.post("/", async (req, res) => {
    const {
        error
    } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customers({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer = await customer.save();
    res.send(customer);
});

// Update
router.put("/:id", async (req, res) => {
    const {
        error
    } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customers.findByIdAndUpdate(
        req.params.id, {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }, {
            new: true
        }
    );
    if (!customer)
        return res.status(404).send(`The customer with the given ID ${id} not found`);

    res.send(customer);
});

// DELETE
router.delete("/:id", async (req, res) => {
    const customer = await Customers.findByIdAndRemove(req.params.id);

    if (!customer)
        return res.status(404).send(`The customer with the given ID ${id} not found`);

    res.send(customer);
});

// Validation body fn
function validateCustomer(customer) {
    const schema = {
        name: Joi.string()
            .min(5)
            .required(),
        phone: Joi.string()
            .min(5)
            .required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, schema);
}

module.exports = router;