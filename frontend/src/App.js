import './App.css';
import Home from './Components/Home/Home.jsx';
import MainHome from './Components/Mainhome/Mainhome.jsx';
import LoginSignup from './Components/LoginSignup/LoginRegister.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<MainHome />} />
        <Route path="/loginsignup" element={<LoginSignup />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
