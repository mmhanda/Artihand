import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCreatOrderMutation } from "../slices/ordersApiSlice";
import { useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

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
        <Col md={8}>col</Col>
        <Col md={4}>col</Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;