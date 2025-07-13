
import Navbar from '../Navbar/Navbar.jsx';
import Carousel from '../../Components/CarouselsPage/Carousel.jsx';

import { FaCameraRetro,FaFilm, FaMusic } from 'react-icons/fa';

import React, { useState, useRef } from 'react';
import './Mainhome.css';


const MainHome = () => {
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const openCamera = async () => {
    setShowModal(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      alert('Camera access denied or not available.');
      setShowModal(false);
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  };

  const closeModal = () => {
    const stream = videoRef.current?.srcObject;
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => track.stop());
    setShowModal(false);
  };

  return (
    <div className="mainhome-wrapper">
      <Navbar />
      <div className="mainhome-container">
        <h1>Welcome to <span>EmotMovies</span></h1>
        <p>Select your journey based on your mood</p>

        <div className="mainhome-buttons">
          <button className="mainhome-btn movie-btn" onClick={openCamera}>
            <FaCameraRetro className="btn-icon" />
            Capture your emotion
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="camera-modal">
          <div className="modal-content">
            <h2>Capture Your Face</h2>
            <video ref={videoRef} className="video-feed" />
            <canvas ref={canvasRef} width="320" height="240" className="canvas-output" />
            <div className="modal-buttons">
              <button onClick={captureImage} className="capture-btn">Capture</button>
              <button onClick={closeModal} className="close-btn">Close</button>
            </div>
          </div>
        </div>
      )}

      <Carousel />
    </div>
  );
};

export default MainHome;


