import React, { useState } from 'react';
import './Movies.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar/Navbar';
import Slider from 'react-slick';
import axios from 'axios';

const genres = [
  { name: 'Action', image: 'action.jpg' },
  { name: 'Thriller', image: 'thriller.jpg' },
  { name: 'Drama', image: 'drama.jpg' },
  { name: 'Fiction', image: 'fiction.jpg' },
  { name: 'Sci-Fi', image: 'scifi.jpg' },
  { name: 'Comedy', image: 'comedy.jpg' },
];

const Movies = () => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [currentGenre, setCurrentGenre] = useState('');

  const handleCardClick = async (genreName) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/movies/${genreName.toLowerCase()}`);
      setMovies(res.data);
      setCurrentGenre(genreName);
      setShowCarousel(true);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowTrailer(true);
  };

  const closeCarousel = () => {
    setShowCarousel(false);
    setSelectedMovie(null);
    setShowTrailer(false);
  };

  const closeTrailer = () => {
    setSelectedMovie(null);
    setShowTrailer(false);
  };

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 2000,
    focusOnSelect: true,
  };

  return (
    <>
      <Navbar />
      <div className={`movies-page ${showCarousel ? 'blurred' : ''}`}>
        <h2 className="genre-heading">Choose Your Genre</h2>
        <div className="container">
          <div className="row">
            {genres.map((genre, index) => (
              <div
                className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center"
                key={index}
              >
                <div
                  className="genre-card shadow"
                  onClick={() => handleCardClick(genre.name)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={require(`../../assets/${genre.image}`)}
                    alt={genre.name}
                    className="genre-img"
                  />
                  <div className="genre-name">{genre.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCarousel && (
        <div className="carousel-overlay">
          <div className="carousel-container">
            <button className="close-btn" onClick={closeCarousel}>✖</button>
            <Slider {...settings}>
              {movies.map((movie, idx) => (
                <div key={idx} className="carousel-slide" onClick={() => handleMovieClick(movie)}>
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="carousel-img"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {showTrailer && selectedMovie && (
            <div className="trailer-overlay">
              <div className="trailer-card">
                <button className="close-btn top-close" onClick={closeTrailer}>✖</button>
                <iframe
                  className="trailer-video"
                  src={selectedMovie.trailerUrl}
                  title={selectedMovie.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <a
                  className="watch-btn"
                  href={selectedMovie.watchLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ▶️ Watch Now
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Movies;
