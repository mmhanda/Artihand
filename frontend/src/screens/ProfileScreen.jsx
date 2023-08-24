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
  return (
    <>Profile Screen</>
  );
};

export default ProfileScreen;