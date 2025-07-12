const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// GET all action movies
router.get('/action', async (req, res) => {
  try {
    const actionMovies = await Movie.find({ genre: 'Action' });
    res.json(actionMovies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// OPTIONAL: POST route to add new movie
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
