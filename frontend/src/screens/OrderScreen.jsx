import { Link, useParams } from "react-router-dom";
import { ListGroup, Row, Col, Image, Card, Button } from 'react-bootstrap';
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useGetOrderDetailsQuery, useGetPayPalClientIdQuery,
            usePayOrderMutation, useDeliverOrderMutation } from "../slices/ordersApiSlice";
import { useSelector } from "react-redux";

const OrderScreen = () => {

  const { id: orderId } = useParams();
  const { data: order, isLoading, refetch, error } = useGetOrderDetailsQuery(orderId);

  const [ payOrder, { isLoading: loadingPay } ] = usePayOrderMutation();
  const [ {isPending}, paypalDispatch ] = usePayPalScriptReducer();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: paypal, isLoading: loadinPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();
  const [ deliverOrder, { isLoading: loadingDeliver, isError: errorDeliver } ] = useDeliverOrderMutation();
  
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async(details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order Paid", {
          autoClose: 2000,
        });
      } catch (err) {
        toast.error(err?.data?.message || err?.message || err);
      }
    });
  };
const fortest = async () => {
  await payOrder({ orderId, details: {payer: {}} });
}
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ]
    })
  }

  const onError = (err) => {
    toast.error(err.message);
  }

  const deliverOrderHandler = async () =>{
    try {
      await deliverOrder(order._id);
      refetch();
      toast.success("Order Delivered", {
        autoClose: 2400,
      })
    } catch (err) {
      toast.error(err?.data?.message || err?.message || err);
    }
  }
  
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
                      { !userInfo.isAdmin && loadingPay && <Loader/> }
                      {!userInfo.isAdmin && isPending ? <Loader/> : (
                        <div>
                        { userInfo && !userInfo.isAdmin && !order.isPaid && (
                          <PayPalButtons createOrder={ createOrder }
                                      onApprove={ onApprove }
                                    onError={ onError }>
                          </PayPalButtons>
                        )}
                        </div>
                      ) }
                    </ListGroup.Item>
                  ) }
                  { loadingDeliver ? <Loader /> : errorDeliver ?
                    <Message variant='danger'> { errorDeliver?.message } </Message>
                    : (
                      <>
                        { userInfo && userInfo.isAdmin && order.isPaid &&
                        !order.isDelivered && (
                          <ListGroup.Item>
                            <Button type="button" className="btn btn-block"
                              onClick={deliverOrderHandler} > Update To Delivered </Button>
                          </ListGroup.Item>
                        )}
                      </>
                    ) }
                    <Button onClick={fortest}>waaa</Button>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      );
};

export default OrderScreen;