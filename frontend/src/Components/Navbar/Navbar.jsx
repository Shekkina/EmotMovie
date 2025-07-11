import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './Navbar.css';
import logo from '../../assets/EmotMovies_logo.jpg';
import Tilt from "react-parallax-tilt";

function NavigationBar() {
  return (
    <Navbar fixed="top" expand="lg" bg="dark" className="my-navbar">
      <Container fluid>
        <Navbar.Brand href="#home">
          <Tilt>
            <img src={logo} alt="Logo" width="40" height="40" className='nav-logo' /> EmotMovies
          </Tilt>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse className="basic-navbar-nav">
            {/* Navbar elements */}
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#movies">Movies</Nav.Link>
            <Nav.Link href="#songs">Songs</Nav.Link>
            <Nav.Link href="#aboutus">About us</Nav.Link>  
            <Nav.Link href="#login">Login/SignUp</Nav.Link>          
          </Nav>

          {/*Search bar */}
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className='search-button'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;