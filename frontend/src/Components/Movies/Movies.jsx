import React from 'react';
import './Movies.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar/Navbar';

const genres = [
  { name: 'Action', image: 'action.jpg' },
  { name: 'Thriller', image: 'thriller.jpg' },
  { name: 'Drama', image: 'drama.jpg' },
  { name: 'Fiction', image: 'fiction.jpg' },
  { name: 'Sci-Fi', image: 'scifi.jpg' },
  { name: 'Comedy', image: 'comedy.jpg' },
];

const Movies = () => {
  return (
    <>
      <Navbar />
      <div className="movies-page">
        <h2 className="genre-heading">Choose Your Genre</h2>
        <div className="container">
          <div className="row">
            {genres.map((genre, index) => (
              <div className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center" key={index}>
                <div className="genre-card shadow">
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
    </>
  );
};

export default Movies;
