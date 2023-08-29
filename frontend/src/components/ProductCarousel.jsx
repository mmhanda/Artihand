import { Link } from "react-router-dom";
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from "../slices/productApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return (
    <div className="product-carousel-container">
      {isLoading ? (
        <></>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel pause="hover" className="bg-dark">
          {products.map((product) => (
            <Carousel.Item key={product._id} className="carousel-item">
              <Link to={`/product/${product._id}`}>
                <div className="image-container">
                  <Image src={product.image} alt={product.name} fluid />
                </div>
                <Carousel.Caption className="carousel-caption">
                  <h2>
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ProductCarousel;