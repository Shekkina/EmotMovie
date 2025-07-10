import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Herosection.css';
import movie1 from '../../assets/movie1.jpg';
import movie2 from '../../assets/movie2.png';
import movie3 from '../../assets/movie3.jpg';
import movie4 from '../../assets/movie4.jpg';
import movie5 from '../../assets/movie5.jpg';
import movie6 from '../../assets/movie6.jpg';
import movie7 from '../../assets/movie7.jpg';

const Hero = () => {

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behaviour: 'smooth'});
  }

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behaviour: 'smooth'});
  }

  const movieCards = [movie1, movie2, movie3, movie4, movie5, movie6, movie7];

  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Discover the Movie for your mood with <span>EmotMovies</span></h1>
        <p>Join in the emotional journey of movies and songs. We help you to pick a genre according to your mood.</p>

        <div className="hero-buttons">
          <button className="btn-start">Get Started</button>
        </div>
      </div>

      <div className="scroll-wrapper">
        <FaChevronLeft className="scroll-icon-left" onClick={scrollLeft} />

        <div className="card-scroll" ref={scrollRef}>
          {movieCards.map((img, index) => (
            <img key={index} src={img} alt={`card${index}`} className="hero-card" />
          ))}
        </div>

        <FaChevronRight className="scroll-icon-right" onClick={scrollRight} />
      </div>
    </section>
  );
}

export default Hero;
