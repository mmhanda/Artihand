import FormContainer from "../components/FormContainer";
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  
  const { search } = useLocation(); //bring the params on the url
  const searchposition = new URLSearchParams(search);
  const redirect = searchposition.get('redirect') || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(!email || !password){
      toast.error("All Fields are required", {
        autoClose: 5000,
      });
      return ;
    }
    try {
      const res = await login({ email, password }).unwrap(); //add unwrap is for throw error because it is returning a promess 
      dispatch(setCredentials({...res}));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
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

        <Button type="submit" variant="primary" className="mt-2"
                  disabled={isLoading}>
          Sign In
        </Button>

      </Form>
      
      <Row className="py-3">
        <Col>
          New Customer? <Link to={redirect ? `/register?redirect=${redirect}`: 
          "/register"}> Register </Link>
        </Col>
      </Row>
      { isLoading && <Loader/> }
    </FormContainer>
  );
};

export default LoginScreen;