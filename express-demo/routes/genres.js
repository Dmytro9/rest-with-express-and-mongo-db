const validateObjectId = require('../middleware/validateObjectId');
const express = require("express");
const {
  Genre,
  validate
} = require('../models/genre')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const router = express.Router();


// Get All
router.get("/", async (req, res) => {
  // throw new Error('Could not get the genres.')
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// Get one by id
router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send(`The genre with the given ID ${id} not found`);

  res.send(genre);
});

// POST
router.post("/", auth, async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name
  });

  await genre.save();
  res.send(genre);
});

// Update
router.put("/:id", async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id, {
      name: req.body.name
    }, {
      new: true
    }
  );
  if (!genre)
    return res.status(404).send(`The genre with the given ID ${id} not found`);

  res.send(genre);
});

// DELETE
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send(`The genre with the given ID ${id} not found`);

  res.send(genre);
});


module.exports = router;