import React, { useState } from 'react';
import './Movies.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar/Navbar';
import Slider from 'react-slick';

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

  const handleCardClick = (genreName) => {
    if (genreName === 'Action') {
      setShowCarousel(true);
    }
  };

  const closeCarousel = () => setShowCarousel(false);

  const carouselImages = [
    'action1.jpg',
    'action2.jpg',
    'action3.jpg',
    'action4.jpg',
    'action5.jpg',
    'action6.jpg',
  ];

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
              {carouselImages.map((img, idx) => (
                <div key={idx} className="carousel-slide">
                  <img
                    src={require(`../../assets/${img}`)}
                    alt={`Action ${idx + 1}`}
                    className="carousel-img"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
};

export default Movies;
