const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  imageUrl: String,     // Poster image link or base64
  trailerUrl: String,   // YouTube or video link
  watchLink: String     // Netflix or other platform link
});

module.exports = mongoose.model('Movie', movieSchema);
