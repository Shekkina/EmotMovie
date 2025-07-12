import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import { FaCameraRetro } from 'react-icons/fa';
import './Mainhome.css';

const MainHome = () => {
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  // Open webcam stream
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

  // Stop webcam stream and clear interval
  const closeModal = () => {
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach((track) => track.stop());
    setShowModal(false);
    clearInterval(intervalRef.current);
    clearCanvas();
  };

  // Clear canvas overlay
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Draw rectangles and labels
  const drawResults = (results) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    clearCanvas();

    ctx.lineWidth = 3;
    ctx.font = "18px Arial";
    ctx.fillStyle = "lime";
    ctx.strokeStyle = "lime";

    results.forEach(({ x, y, width, height, emotion }) => {
      ctx.strokeRect(x, y, width, height);
      ctx.fillText(emotion, x, y > 20 ? y - 5 : y + 20);
    });
  };

  // Capture frame and send to backend for prediction
  const sendFrameForPrediction = async () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];

    try {
      const response = await fetch('http://localhost:5000/detect_emotion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image }),
      });
      if (!response.ok) throw new Error('Backend error ' + response.status);

      const data = await response.json();
      if (data.results) {
        drawResults(data.results);
      } else {
        clearCanvas();
      }
    } catch (err) {
      console.error('Error:', err);
      clearCanvas();
    }
  };

  // Start periodic frame sending every 1 second
  useEffect(() => {
    if (showModal) {
      intervalRef.current = setInterval(sendFrameForPrediction, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [showModal]);

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

      {showModal && (
        <div className="camera-modal" style={{ position: 'relative', width: 640, height: 480 }}>
          <video
            ref={videoRef}
            width="640"
            height="480"
            style={{ position: 'absolute', top: 0, left: 0 }}
            muted
            autoPlay
            playsInline
          />
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
          />
          <div className="modal-buttons" style={{ position: 'absolute', bottom: 10, left: 10 }}>
            <button onClick={closeModal} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainHome;
