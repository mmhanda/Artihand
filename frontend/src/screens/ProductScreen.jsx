import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Rating from "../components/Rating";
import Loder from "../components/Loader";
import Message from "../components/Message";
import { Form, Col, Row, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import { useGetproductDetailsQuery } from "../slices/productDetailsApiSlice";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const {id: productID} = useParams();
  const { data: product, isLoading, error } = useGetproductDetailsQuery(productID);
  const [qty, setQty] = useState(1);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
    <Link className="btn btn-light my-3" to="/" >Go Back</Link>
    { isLoading ? (
				<Loder/>
			) : error ? (<div><Message variant="danger"> { error?.data?.message || error.error } </Message></div>) :
			(<>
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
      </>)
    }
    </>
  )
};

export default ProductScreen;