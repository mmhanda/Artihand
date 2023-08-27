import FormContainer from "../components/FormContainer";
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {

  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ Confirmopassword, setConfirmoPassword ] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
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

    if(!email || !password || !name || !Confirmopassword){
      toast.error("All Fields are required", {
        autoClose: 2200,
      });
      return ;
    }
    else if (password !== Confirmopassword) {
      toast.error("Passwords must match", {
        autoClose: 2200,
      });
      return ;
    }
    else {
      try {
        const res = await register({ email, password, name }).unwrap(); //add unwrap is for throw error because it is returning a promess 
        dispatch(setCredentials({...res}));
        navigate(redirect);
        toast.success("Registered Successfully", {
          autoClose: 2400,
        });
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1> Sign Up </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label> Your name </Form.Label>
            <Form.Control type="text" placeholder="First and last name"
              value={name} onChange={(e) => setName(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="my-3">
          <Form.Label> Email Address </Form.Label>
            <Form.Control type="email" placeholder="email"
              value={email} onChange={(e) => setEmail(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label> Password </Form.Label>
            <Form.Control type="password" placeholder="password"
              value={password} onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="confirm-password" className="my-3">
          <Form.Label> Re-enter password </Form.Label>
            <Form.Control type="password" placeholder="confirm password"
              value={Confirmopassword} onChange={(e) => setConfirmoPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2"
                  disabled={isLoading}>
          Register
        </Button>

      </Form>
      <Row className="py-3">
        <Col>
          Already Registred? <Link to={redirect ? `/login?redirect=${redirect}`: 
          "/login"}> Login </Link>
        </Col>
      </Row>
      { isLoading && <Loader/> }
    </FormContainer>
  );
};

export default RegisterScreen;