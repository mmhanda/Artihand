import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from '../components/Loader';
import Message from "../components/Message";

const HomeScreen = () => {

	const { pageNumber } = useParams();
	const { data, isLoading, error } = useGetProductsQuery({pageNumber});

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
			</>)}
		</>
	);
};

export default HomeScreen;