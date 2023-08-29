import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from 'react-icons/fa';
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Meta from "../components/Meta";

const CartScreen = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (item, qty) => {
    dispatch(addToCart({...item, qty}));
  };

  const removeFromCarttHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  }

  return(
    <Row>
      <Meta title="cart"/>
      <Col md={8}>
        <h1 style={{marginBottom: '20px'}} >Shopping Cart</h1>
        <Link className="btn btn-light my-3" to='/' onClick={<Meta/>} >Go Back</Link>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty <Link to='/' >Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush" >
            { cartItems.map((item) => (
              <ListGroup.Item key={item._id} >
                <Row>
                  <Col md={2}>
                    <Image src={ item.image } alt={item.name} fluid rounded/> 
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}> {item.name} </Link>
                  </Col>
                  <Col>
                    ${item.price}
                  </Col>
                  <Col md={2}>
                  <Form.Control as='select' value={item.qty} onChange={(e) =>
                    { addToCartHandler(item, Number(e.target.value)) }} >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1 + " Pieces"}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="light" 
                            onClick={() => removeFromCarttHandler(item._id)}
                    > <FaTrash/> </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            )) }
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush" >
            <ListGroup.Item>
              <h2> SubTotal
              ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              ${cartItems.reduce((acc, item) =>
                  acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block"
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}>
                        Procced To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
};

export default CartScreen;