import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from '../components/Loader';
import Message from "../components/Message";
import Paginate from './Paginate';
import Carousel from '../components/ProductCarousel';
import { useEffect } from 'react';
import Meta from '../components/Meta';

const HomeScreen = () => {

	const { pageNumber, keyword } = useParams();
	const { data, isLoading, error } = useGetProductsQuery({ pageNumber, keyword });

	useEffect(() => {
		<Meta/>
	}, []);
	return (
		<>
			{ !keyword ? <Carousel/> :
					<Link to='/' className='btn btn-light mb-4'> Go Back </Link> }
			{isLoading ? (
				<Loader/>
			) : error ? (<div><Message variant="danger">
					{ error?.data?.message || error.error } </Message></div>) :
			( <>
			<h1> Latest Products </h1>
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