import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from '../components/Loader';
import Message from "../components/Message";
import Paginate from './Paginate';
import Carousel from '../components/ProductCarousel';

const HomeScreen = () => {

	const { pageNumber, keyword } = useParams();
	const { data, isLoading, error } = useGetProductsQuery({ pageNumber, keyword });

	return (
		<>
			{isLoading ? (
				<Loader/>
			) : error ? (<div><Message variant="danger"> { error?.data?.message || error.error } </Message></div>) :
			( <>
				<Row>
					{data.products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
				<Paginate pages={data.pages} pageNumber={data.pageNumber}
										keyword={ keyword ? keyword : ''}/>
			</>)}
		</>
	);
};

export default HomeScreen;