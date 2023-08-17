import FormContainer from "../components/FormContainer";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaKissBeam, FaVoicemail } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";

const LoginScreen = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(useLoginMutation);
    console.log('submit handler called');
  };

  return (
    <FormContainer>
      <h1> Sign In </h1>
      <Form onSubmit={submitHandler}>
        
        <Form.Group controlId="email" className="my-3">
          <Form.Label> Email Address </Form.Label>
            <Form.Control type="email" placeholder="email"
              value={email} onChange={(e) => setEmail(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label> Password </Form.Label>
            <Form.Control type="password" placeholder="password"
              value={password} onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2">
          Sign In
        </Button>
      </Form>
      
      <Row className="py-3">
        <Col>
          New Customer? <Link to='/register'> Register </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;