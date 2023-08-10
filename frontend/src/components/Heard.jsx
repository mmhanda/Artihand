import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo (1).png";

const Header = () => {
  return (
      <header>
      <Navbar bg="light" variant="light" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/" >
          <img src={logo} alt=""/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/login"> <FaUser/> Sing In </Nav.Link>
              <Nav.Link href="/cart"> <FaShoppingCart/> cart </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </header>
  );
};

export default Header;