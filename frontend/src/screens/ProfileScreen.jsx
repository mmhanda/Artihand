import { useProfileMutation } from "../slices/usersApiSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {

  const [ name, setName ] = useState(''); 
  const [ email, setEmail ] = useState(''); 
  const [ password, setPassword ] = useState(''); 
  const [ confirmPassword, setConfirmPassword ] = useState('');
  
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [ updateProfile, { isLoading: loadingupdateProfile } ] = useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }

  },[userInfo, userInfo.name, userInfo.email, setName, setEmail]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(!email || !password || !name || !confirmPassword){
      toast.error("All Fields are required", {
        autoClose: 2200,
      });
      return ;
    }
    else if (password !== confirmPassword) {
      toast.error("Passwords must match", {
        autoClose: 2200,
      });
      return ;
    }
    else {
      try {
        const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Updated Successfully", {
          autoClose: 2400,
        });
      } catch (err) {
        toast.error(err?.error?.message || err?.message);
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2> User Profile </h2>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label> Name </Form.Label>
            <Form.Control type="name" placeholder="Enter name"
                    value={name} onChange={(e) => setName(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label> Email </Form.Label>
            <Form.Control type="email" placeholder="Enter email"
                      value={email} onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label> Password </Form.Label>
            <Form.Control type="password" placeholder="Enter password"
                    value={password} onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label> Confirm Password </Form.Label>
            <Form.Control type="password" placeholder="Confirm Password"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <Button type="submit" className="my-2" variant="primary"> Update </Button>
          { loadingupdateProfile && <Loader/> }
        </Form>
      </Col>
      <Col md={9}>column</Col>
    </Row>
  );
};

export default ProfileScreen;