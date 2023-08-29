import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Rating from "../components/Rating";
import Message from "../components/Message";
import { Form, Col, Row, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import { useGetproductDetailsQuery } from "../slices/productDetailsApiSlice";
import { useCreateProductReviewMutation } from "../slices/productApiSlice";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Meta from '../components/Meta';

const ProductScreen = () => {
  const { id: productID } = useParams();
  const [ qty, setQty ] = useState(1);
  const [ rating, setRating ] = useState(0);
  const [ comment, setComment ] = useState('');

  const { data: product, isLoading, error, refetch } = useGetproductDetailsQuery(productID);
  const [ createProductReview, { isLoading: loadingReview } ] = useCreateProductReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createProductReview({_id: product._id, rating, comment}).unwrap();
      refetch();
      toast.success("Review Submited", {
        autoClose: 1000,
      });
    } catch (err) {
      toast.error(err?.data?.message || err?.message || err);
    }
  }
  return (
    <>
    <Link className="btn btn-light my-3" to="/" onClick={<Meta/>}>Go Back</Link>
    { isLoading ? (
				<Loader/>
			) : error ? (<div><Message variant="danger"> { error?.data?.message || error.error } </Message></div>) :
			(<>
        <Meta title={product.name}/>
        <Row>
          <Col md={6}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>

          <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3> {product?.name} </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product?.rating} text={`${product?.numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item> Price ${product?.price}</ListGroup.Item>
            <ListGroup.Item>
              <strong>Description:</strong> <h7> {product?.description} </h7>
            </ListGroup.Item>
          </ListGroup>

          </Col>
          <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col> <strong>{product?.countInStock > 0 ? 'In stock' : "Out Of Stock"}</strong></Col>
                </Row>
              </ListGroup.Item>
              {
                product?.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as='select'
                                     value={qty}
                                     onChange={(e) => {
                                     setQty(Number(e.target.value)
                                     )}} >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1 + " Pieces"}
                            </option>
                          ))}
                          {/* the keys() is for the indexes creating*/}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )
              }
              <ListGroup.Item>
                <Button className="btn-block" type="button"
                        disabled={product?.countInStock === 0}
                        onClick={addToCartHandler}>
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          </Col>
        </Row>
        <Row className="review">
          <Col md={6}>
            <h2> Reviews </h2>
            { product.reviews.length === 0 && <Message> No Reviews For Now</Message> }
            <ListGroup variant="flush">
              { product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong> {review.name} </strong>
                  <Rating value={review.rating}/>
                  <p> {review.createdAt.substring(0,10)} </p>
                  <p> {review.comment} </p>
                </ListGroup.Item>
              )) }
              <ListGroup.Item>
                <h2> Write a Customer Review </h2>
                { loadingReview && <Loader/> }
                { userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating" className="my-2">
                      <Form.Label> Rating </Form.Label>
                      <Form.Control as='select' value={rating}
                        onChange={(e) => Number(setRating(e.target.value))}>
                          <option value=''> Select... </option>
                          <option value='1'> 1 - Poor </option>
                          <option value='2'> 2 - Fair </option>
                          <option value='3'> 3 - Good </option>
                          <option value='4'> 4 - Very Good </option>
                          <option value='5'> 5 - Excellent </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment" className="my-2">
                      <Form.Label> Comment </Form.Label>
                      <Form.Control as='textarea' row='3'
                        value={comment} onChange={(e) => setComment(e.target.value)}>
                      </Form.Control>
                    </Form.Group>
                    <Button type="submit" disabled={loadingReview}
                              variant="primary"> Submit </Button>
                  </Form>
                ) : (<Message> Please <Link to='/login'> Sign In </Link>
                                to write a review </Message>) }
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </>)
    }
    </>
  )
};

export default ProductScreen;