import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css'; 

import img1 from '../../assets/movie1.jpg';
import img2 from '../../assets/movie2.png';
import img3 from '../../assets/movie3.jpg';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div><img src={img1} alt="1" /></div>
        <div><img src={img2} alt="2" /></div>
        <div><img src={img3} alt="3" /></div>
      </Slider>
    </div>
  );
};

export default Carousel;
