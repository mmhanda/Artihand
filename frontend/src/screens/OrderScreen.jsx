import { Link, json, useParams } from "react-router-dom";
import { ListGroup, Row, Col, Image, Form, Card, Button } from 'react-bootstrap';
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useGetOrderDetailsQuery, useGetPayPalClientIdQuery,
            usePayOrderMutation } from "../slices/ordersApiSlice";

const OrderScreen = () => {

  const { id: orderId } = useParams();
  const { data: order, isLoading, refetch, error } = useGetOrderDetailsQuery(orderId);

  const [ payOrder, { isLoading: loadingPay } ] = usePayOrderMutation();
  const [ {isPending}, paypalDispatch ] = usePayPalScriptReducer();
  const { userInfo }  = useSelector((state) => state.auth);
  const { data: paypal, isLoading: loadinPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

  // console.log(JSON.stringify());
  function onApprovetest() {}

  function createOrder() {}

  function onApprove() {}

  function onError() {}

  useEffect(() => {
    if (!errorPayPal && !loadinPayPal && paypal.clientId) {
      const loadPayPalScritpt = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          }
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending'});
      }
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScritpt();
        }
      }
    }
  },[paypal, order, paypalDispatch, loadinPayPal, errorPayPal]);

  return isLoading ? (<Loader/>) : error ? <Message variant='danger'>
    {error.message} </Message> :
      (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2> Shipping </h2>
                  <p>
                    <strong> Name: </strong> { order.user.name }
                  </p>
                  <p>
                    <strong> Email: </strong> { order.user.email }
                  </p>
                  <p>
                    <strong> Address: </strong>
                    { order.shippingAddress.address },
                    { order.shippingAddress.city },
                    { order.shippingAddress.postalCode },
                    { order.shippingAddress.country }
                  </p>
                  { order.isDelivered ? (
                    <Message variant='success'> Delivered on: { order.deliveredAt } </Message>
                  ) : (
                    <Message variant='danger' > Not Delivered </Message>
                  ) }
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong> Method: </strong>
                    { order.paymentMethod }
                    { order.isPaid ? (
                    <Message variant='success'> Paid on: { order.paidAt } </Message>
                    ) : (
                      <Message variant='danger' > Not Paid </Message>
                    ) }
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2> Order Items </h2>
                  { order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index} >
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} fluid alt={item.name} rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}> { item.name } </Link>
                        </Col>
                        <Col md={4}>
                          { item.qty } x ${ item.price } = ${ item.qty * item.price }
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )) }
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${ order.itemsPrice }</Col>
                    </Row>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${ order.shippingPrice }</Col>
                    </Row>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${ order.taxPrice }</Col>
                    </Row>
                    <Row>
                      <Col>Total</Col>
                      <Col>${ order.totalPrice }</Col>
                    </Row>
                  </ListGroup.Item>
                  { !order.isPaid && (
                    <ListGroup.Item>
                      { loadingPay && <Loader/> }
                      { isPending ? <Loader/> : (
                        <div>
                          <Button onClick={onApprovetest}
                              style={{marginBottom: '10px'}}> test </Button>
                          <div>
                            <PayPalButtons createOrder={ createOrder() }
                                        onApprove={ onApprove() }
                                      onError={ onError() }>
                            </PayPalButtons>
                          </div>
                        </div>
                      ) }
                    </ListGroup.Item>
                  ) }
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      );
};

export default OrderScreen;