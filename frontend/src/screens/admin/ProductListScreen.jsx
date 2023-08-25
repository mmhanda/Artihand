import { LinkContainer } from "react-router-bootstrap";
import { Table, Row, Col, Button } from "react-bootstrap";
import { FaTrash, FaEdit } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useGetProductsQuery, useCreateProductMutation } from "../../slices/productApiSlice";

const ProductListScreen = () => {

  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [ createProduct, {isLoading: lodingCreate} ] = useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Confirm Creating New Product')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.error?.message || err.message);
      }
    }
  }

  const deleteHandler = async (itemId) => {
    console.log("delete");
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2> products </h2>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      { lodingCreate && <Loader /> }
      { isLoading ? <Loader/> : error ? <Message variant='danger'> {error} </Message> :
        (
          <>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th> ID </th>
                  <th> Name </th>
                  <th> Price </th>
                  <th> CATEGORY </th>
                  <th> BRAND </th>
                    <th></th>
                </tr>
              </thead>
              <tbody>
                { products.map((item) => (
                  <tr key={item._id}>
                    <td> { item._id } </td>
                    <td> { item.name } </td>
                    <td> { item.price } </td>
                    <td> { item.category } </td>
                    <td> { item.brand } </td>
                    <td>
                      <LinkContainer to={`/admin/product/${item._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit/>
                        </Button>
                      </LinkContainer>
                      <Button variant="danger" className="btn-sm"
                        onClick={() => deleteHandler(item._id)}  >
                        <FaTrash style={{color: 'white'}}/> </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
    </>
  )
}

export default ProductListScreen;