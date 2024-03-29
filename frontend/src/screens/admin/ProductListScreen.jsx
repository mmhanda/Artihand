import { LinkContainer } from "react-router-bootstrap";
import { Table, Row, Col, Button } from "react-bootstrap";
import { FaTrash, FaEdit } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useGetProductsQuery, useCreateProductMutation,
          useDeleteProductMutation } from "../../slices/productApiSlice";
import { useParams } from "react-router-dom";
import Paginate from "../Paginate";

const ProductListScreen = () => {

  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber});
  const [ createProduct, {isLoading: lodingCreate} ] = useCreateProductMutation();
  const [ deleteProduct, { isLoading: lodingDelete } ] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Confirm Creating New Product')) {
      try {
        await createProduct();
        refetch();
        toast.success("Product Created", {
          autoClose: 1000,
        });
      } catch (err) {
        toast.error(err?.error?.message || err.message);
      }
    }
  }

  const deleteHandler = async (itemId) => {
    if (window.confirm('Are you sure!')) {
      try {
        await deleteProduct(itemId);
        refetch();
        toast.success("Product Deleted", {
          autoClose: 2000,
        });
      } catch (err) {
        toast.error(err?.error?.message || err.message);
      }
    }
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2> Products </h2>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      { lodingDelete && <Loader/> }
      { lodingCreate && <Loader />}
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
                { data.products.map((item) => (
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
                        onClick={() => deleteHandler(item._id)} >
                        <FaTrash style={{color: 'white'}}/> </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate pages={data.pages} pageNumber={data.pageNumber} isAdmin={true}/>
          </>
        )}
    </>
  )
}

export default ProductListScreen;