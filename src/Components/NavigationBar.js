import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Button, Image } from 'react-bootstrap';



import 'bootstrap/dist/css/bootstrap.min.css';

{/*App.js is the Parent component of NavigationBar */ }
function NavigationBar({ user }) {

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };



  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Happy Chef!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">


            <Nav.Link href="/">Home</Nav.Link>



            <Nav.Link href="aboutus">About Us</Nav.Link>
            <Nav.Link href="contactus">Contact Us</Nav.Link>
            <NavDropdown title="Categories" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Appetizer</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Salad
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Main course</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Dessert</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Mignardise
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
            {user !== null ? (
              <Nav.Link href="/login">
                Welcome <span style={{ color: 'green' }}>{user.displayName}</span>!
              </Nav.Link>) : (<Nav.Link href="/login">Login</Nav.Link>)}
            <Nav.Link eventKey={2} href="/newrecipes">
              Add Recipe
            </Nav.Link>

          </Nav>
          {user !== null ? (<Button variant="outline-danger" onClick={logout}>
            Logout
          </Button>) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;