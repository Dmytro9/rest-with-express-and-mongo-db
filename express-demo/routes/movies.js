const express = require("express");
const {
    Movie,
    validate
} = require('../models/movie')
const Genre = require('../models/genre')
const router = express.Router();


// Get All
router.get("/", async (req, res) => {
    const genres = await Movie.find().sort("title");
    res.send(genres);
});

// POST
router.post("/", async (req, res) => {
    const {
        error
    } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send('Invalid genre');

    let movie = new Movie({
        title: req.body.name,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre._id,
            name: genre.name
        }
    })

    movie = await movie.save();
    res.send(movie);
});



module.exports = router;