import { Form, ListGroupItem } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCreatOrderMutation } from "../slices/ordersApiSlice";
import { useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]); 

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p> <strong> Address: </strong> </p>
              { cart.shippingAddress.address }, { cart.shippingAddress.city },
              { cart.shippingAddress.postalCode }, { cart.shippingAddress.country }
            </ListGroupItem>
            
            <ListGroupItem>
              <h2>Payment Method</h2>
              <strong> Method: </strong>
              { cart.paymentMethod }
            </ListGroupItem>

            <ListGroupItem>
              <h2> Order Items </h2>
              { cart.cartItems.length === 0 ?
              ( <Message> Your Cart is empty <Link to='/'> Add items </Link> </Message> ):
              (<ListGroup variant="flush">
                { cart.cartItems.map((item, index) => (
                  <ListGroupItem key={index} > 
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`} > { item.name } </Link>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )) }
              </ListGroup>)}
            </ListGroupItem>

          </ListGroup>
        </Col>
        <Col md={4}>col</Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;