import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import FormContainer from '../components/FormContainer';
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  
  const [ address, setAddress ] = useState(shippingAddress?.address ||'');
  const [ city, setCity ] = useState(shippingAddress?.city ||'');
  const [ postalCode, setPostalCode ] = useState(shippingAddress?.postalCode ||'');
  const [ country, setCountry ] = useState(shippingAddress?.country ||'');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) =>{
    e.preventDefault();

    if (!address || !city || !postalCode || !country ) {
      toast.error("All Fields are required", {
        autoClose: 2000,
      })
      return ;
    } else {
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      navigate('/payment');
    }
  };

  return(
    <FormContainer>
      <h1> Shipping </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-2'>
          <Form.Label> Address </Form.Label>
            <Form.Control type='text' placeholder='Enter address'
                            value={address} onChange={(e) => setAddress
                                (e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='city' className='my-2'>
          <Form.Label> City </Form.Label>
            <Form.Control type='text' placeholder='Enter city'
                            value={city} onChange={(e) => setCity
                                (e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode' className='my-2'>
          <Form.Label> PostalCode </Form.Label>
            <Form.Control type='text' placeholder='Enter postalCode'
                            value={postalCode} onChange={(e) => setPostalCode
                                (e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='country' className='my-2'>
          <Form.Label> Country </Form.Label>
            <Form.Control type='text' placeholder='Enter country'
                            value={country} onChange={(e) => setCountry
                                (e.target.value)}></Form.Control>
        </Form.Group>
          {/* <div className="button-container"> */}
            <Button className='my-2' type='submit' variant='primary'>Continue</Button>
            {/* <Link className="btn btn-light my-3" to="/cart">Go Back</Link> */}
          {/* </div> */}
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;