import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo (1).png";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [ logoutExpireToken ] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutExpireToken().unwrap(); // unwrap for throwing error bacuse is retuning a promess
      dispatch(logout());
      navigate('/');
      toast.info("Logged Out", {
        autoClose: 1800,
      });
    } catch (err) {
      toast.error(err?.error?.message || err.message);
    }
  };

  return (
      <header>
      <Navbar bg="light" variant="light" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt=""/>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              { userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item> Profile </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                ) : (
                    <LinkContainer to="/login">
                      <Nav.Link href="/login"> <FaUser/> Sign In </Nav.Link>
                    </LinkContainer>
                  )}
                  { userInfo && userInfo.isAdmin && (
                    <NavDropdown title="admin" id='adminmenu'>
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item> Products </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item> Users </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item> Orders </NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  ) }
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart/> Cart
                    {
                      cartItems.length > 0 && (
                      <Badge pill bg="success" style={{marginLeft: "5px"}} >
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>)
                    }
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </header>
  );
};

export default Header;