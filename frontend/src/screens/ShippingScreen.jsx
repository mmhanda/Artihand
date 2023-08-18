import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from "react-bootstrap";

const ShippingScreen = () => {

  const [ address, setAddress ] = useState('');
  const [ city, setCity ] = useState('');
  const [ postalCode, setPostalCode ] = useState('');
  const [ country, setCountry ] = useState('');

  const submitHandler = () =>{};

  return(
    <FormContainer>
      <h1> Shipping </h1>
      <Form onSubmit={submitHandler}>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;