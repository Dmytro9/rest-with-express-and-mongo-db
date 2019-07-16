const express = require("express");
const {
    Customer,
    validate
} = require('../models/customer');
const router = express.Router();


// Get All
router.get("/", async (req, res) => {
    const customer = await Customer.find().sort("name");
    res.send(customer);
});

// Get one by id
router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer)
        return res.status(404).send(`The customer with the given ID ${id} not found`);

    res.send(customer);
});

// POST
router.post("/", async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });

    await customer.save();
    res.send(customer);
});

// Update
router.put("/:id", async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(
        req.params.id, {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }, {
            new: true,
            useFindAndModify: false
        },
    );
    if (!customer)
        return res.status(404).send(`The customer with the given ID ${id} not found`);

    res.send(customer);
});

// DELETE
router.delete("/:id", async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer)
        return res.status(404).send(`The customer with the given ID ${id} not found`);

    res.send(customer);
});

module.exports = router;