import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from 'react-icons/fa';
import Message from "../components/Message";


const CartScreen = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return(
    <Row>
      <Col md={8}>
        <h1 style={{marginBottom: '20px'}} >Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty <Link to='/' >Go Back</Link>
          </Message>
        ): (
          <ListGroup variant="flush" >
            cartItems
          </ListGroup>
        )}
      </Col>
    </Row>
  )
};

export default CartScreen;