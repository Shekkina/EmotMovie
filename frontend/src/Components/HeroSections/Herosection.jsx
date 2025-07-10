import './Herosection.css';
import movie1 from '../../assets/movie1.jpg';
import movie2 from '../../assets/movie2.png';
import movie3 from '../../assets/movie3.jpg';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Discover the Movie for your mood with <span>EmotMovies</span></h1>
        <p>Join in the emotional journey of movies and songs. We help you to pick a genre according to your mood.</p>
        <div className="hero-buttons">
          <button className="btn-start">Get Started</button>
        </div>
      </div>

      <div className="hero-cards">
        <img src={movie1} alt="card1" className="hero-card" />
        <img src={movie2} alt="card2" className="hero-card" />
        <img src={movie3} alt="card3" className="hero-card" />
      </div>
    </section>
  );
}

export default Hero;
