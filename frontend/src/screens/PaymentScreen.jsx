import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { Form, Button, Col } from "react-bootstrap";
import { toast } from "react-toastify";

function PaymentScreen() {

  const [ paymentMethod, setPaymentMethod ] = useState('PayPal');
  const cart  = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const size = Object.keys(shippingAddress).length;
    if (size === 0) {
      toast.error("Shipping Address First", { autoClose: 3400, });
      navigate("/shipping");
      return ;
    }
  },[shippingAddress, navigate]); //adding dependencies

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button type="submit" className="my-2" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};


export default PaymentScreen;