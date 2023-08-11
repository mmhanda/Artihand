import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Col, Row, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const { id: productID } = useParams();

  const fetchProducts = async () => {
    const {data} = await axios.get(`/api/products/${productID}`);
    setProduct(data);
  }
  
  useEffect(() => {
    fetchProducts();
  },[productID]);

  return (
    <>
    <Link className="btn btn-light my-3" to="/" >Go Back</Link>
    <Row>
      <Col md={5}>
        <Image src={product?.image} alt={product?.name} fluid />
      </Col>

      <Col md={4}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3> {product?.name} </h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <Rating value={product?.rating} text={`${product?.numReviews} reviews`}/>
        </ListGroup.Item>
        <ListGroup.Item>
          <h4>Price ${product?.price}</h4>
          <strong>Description:</strong> {product?.description}
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
          <ListGroup.Item>
            <Button className="btn-block" type="button"
                    disabled={product?.countInStock === 0}>
              Add To Cart
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      </Col>
    </Row>
    </>
  )
};

export default ProductScreen;