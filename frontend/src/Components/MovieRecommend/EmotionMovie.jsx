import React, { useState, useEffect } from 'react';
import './EmotionMovie.css';

export default function EmotionMovieApp({ results }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  return (
    <div className="recommendation-container">
      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {results.length > 0 && (
        <>
          <h2 className="recommendation-title">🎭 Your Movie Recommendations</h2>
          {results.map((res, index) => (
            <div key={index} className="emotion-block">
              <p className="emotion-label">
                Detected Emotion: <span>{res.emotion}</span>
              </p>
              <div className="movie-grid">
                {res.recommendations.map((movie, i) => (
                  <div key={i} className="movie-card fade-in">
                    <div className="movie-poster-container">
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="movie-poster"
                      />
                    </div>
                    <div className="movie-info">
                      <h3>{movie.title}</h3>
                      <p>{movie.description}</p>
                      <p>
                        <strong>Available on:</strong> {movie.ott}
                      </p>
                      <a
                        href={movie.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🎬 Watch Now
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
