
import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import './Mainhome.css';
import { FaFilm, FaMusic } from 'react-icons/fa';

const MainHome = () => {
  return (
    <div className="mainhome-wrapper">
         <Navbar />
      <div className="mainhome-container">
        <h1>Welcome to <span>EmotMovies</span></h1>
        <p>Select your journey based on your mood</p>

        <div className="mainhome-buttons">
          <button className="mainhome-btn movie-btn">
            <FaFilm className="btn-icon" />
            Recommend Movie
          </button>

          <button className="mainhome-btn song-btn">
            <FaMusic className="btn-icon" />
            Recommend Song
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainHome;

