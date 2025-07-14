const express = require('express'); 
const router = express.Router();
const Movie = require('../models/Movie');

// GET movies by genre (dynamic route)
router.get('/:genre', async (req, res) => {
  const genreParam = req.params.genre;

  try {
    // Capitalize first letter to match your DB values: "Action", "Drama", etc.
    const genre = genreParam.charAt(0).toUpperCase() + genreParam.slice(1).toLowerCase();
    const movies = await Movie.find({ genre });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to add a new movie
router.post('/', async (req, res) => {
  const { title, genre, imageUrl, trailerUrl, watchLink } = req.body;

  const newMovie = new Movie({ title, genre, imageUrl, trailerUrl, watchLink });

  try {
    const saved = await newMovie.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
