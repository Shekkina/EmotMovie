import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmotionMovieApp from './EmotionMovie';

const RecommendationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.results) {
    return (
      <div className="text-center mt-10">
        <p>No emotion detected. Try again.</p>
        <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="recommendation-wrapper">
      <EmotionMovieApp results={state.results} />
    </div>
  );
};

export default RecommendationPage;
