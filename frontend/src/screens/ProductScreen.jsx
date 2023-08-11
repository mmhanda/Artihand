import { useParams } from "react-router-dom";
import products from "../productes";
import { Link } from "react-router-dom";
import { Col, Row, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const product = products.find((e) => (e._id == productId));
  return (
    <>
    <Link className="btn btn-light my-3" to="/" >Go Back</Link>
    </>
  )
};

export default ProductScreen;