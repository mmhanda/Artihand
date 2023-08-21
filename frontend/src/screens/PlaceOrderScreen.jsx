import { Form, ListGroupItem } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCreatOrderMutation } from "../slices/ordersApiSlice";
import { useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [ creatOrder, { isLoading, error } ] = useCreatOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const res = await creatOrder({ 
        orderItems: cart.cartItems,
        shippingAdress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      console.log(cart.res);
      // dispatch(clearCartItems());
      // navigate(`/order/${res._id}`);
      toast.success("Order Created", {
        autoClose: 2000,
      });
    } catch (err) {
      toast.error(err?.error?.message || err.message);
    }
  };
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
        <Col md={8}>
          <ListGroup>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p> <strong> Address: </strong> </p>
              { cart.shippingAddress.address }, { cart.shippingAddress.city },
              { cart.shippingAddress.postalCode }, { cart.shippingAddress.country }
            </ListGroupItem>
            
            <ListGroupItem>
              <h2>Payment Method</h2>
              <strong> Method: </strong>
              { cart.paymentMethod }
            </ListGroupItem>

            <ListGroupItem>
              <h2> Order Items </h2>
              { cart.cartItems.length === 0 ?
              ( <Message> Your Cart is empty <Link to='/'> Add items </Link> </Message> ):
              (<ListGroup variant="flush">
                { cart.cartItems.map((item, index) => (
                  <ListGroupItem key={index} > 
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item._id}`} > { item.name } </Link>
                      </Col>
                      <Col md={4}>
                        { item.qty } x ${ item.price } = ${ item.qty * item.price }
                      </Col>
                    </Row>
                  </ListGroupItem>
                )) }
              </ListGroup>)}
            </ListGroupItem>

          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2> Order Summry </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Items: </Col>
                  <Col>
                    ${ cart.itemPrice }
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Shipping: </Col>
                  <Col>
                    ${ cart.shippingPrice }
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Tax: </Col>
                  <Col>
                    ${ cart.taxPrice }
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Total Price: </Col>
                  <Col>
                    ${ cart.totalPrice }
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'> {error} </Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type="button"
                        className="btn-block"
                        disabled={cart.cartItems.length === 0}
                        onClick={ () => placeOrderHandler() }>
                          PlaceOrder
                        </Button>
                { isLoading && <Loader /> }
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;