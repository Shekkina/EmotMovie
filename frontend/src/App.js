import './App.css';
import Home from './Components/Home/Home.jsx';
import MainHome from './Components/Mainhome/Mainhome.jsx';
import Movies from './Components/Movies/Movies.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<MainHome />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
