import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { useUpdateProductMutation, useUploadProductImageMutation } from '../../slices/productApiSlice';
import { useGetproductDetailsQuery } from "../../slices/productDetailsApiSlice";

const ProductEditScreen = () => {

  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [ name, setName ] = useState('');
  const [ price, setPrice ] = useState(0);
  const [ image, setImage ] = useState('');
  const [ brand, setBrand ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ countInStock, setCountInStock ] = useState(0);
  const [ description, setDescription ] = useState('');

  const { data: product, isLoading, error} = useGetproductDetailsQuery(productId);

  const [ updateProduct, { isLoading: loadingUpdate } ] = useUpdateProductMutation();
  const [ uploadProductImage, { isLoading: loadingUpload } ] = useUploadProductImageMutation();

  useEffect(() => {
    setName(product?.name);
    setPrice(Number(product?.price));
    setImage(product?.image);
    setBrand(product?.brand);
    setCategory(product?.category);
    setCountInStock(Number(product?.countInStock));
    setDescription(product?.description);
  }, [product])

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProduct({
        _id: product._id,
        name,
        price,
        brand,
        category,
        countInStock,
        description,
        image,
      })
      
      if (res.err){
        toast.error(res.err?.data?.message || res.err?.message || res.err);
      } else {
        navigate('/admin/productlist');
        toast.success("Product Updated", {
          autoClose: 2000,
        });
      };

    } catch (err) {
      toast.error(err?.data?.message || err?.message || err);
    };
  };

  const uploadFileHandler = async (e) => {

    const formdata = new FormData();
    formdata.append('image',e.target.files[0]);

    console.log(e.target.files[0]);
    try {
      loadingUpdate && console.log("loading");
      const res = await uploadProductImage(formdata).unwrap();
      setImage(res.image); // the image is storing the new path
      console.log(image);
    } catch (err) {
      toast.error(err?.data?.message || err?.message || err);
    }
  }
  return (
    <>
      <Link to='/admin/productlist' className="btn btn-light my-3">Go Back </Link>

      <FormContainer>
        <h1> Edit Product </h1>
        { loadingUpdate && <Loader /> }

        { isLoading ? <Loader /> : error ? <Message variant='danger'> {error} </Message>
          : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label> Name </Form.Label>
                <Form.Control type="name" placeholder="Enter name" 
                    value={name} onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label> Price </Form.Label>
                <Form.Control type="number" placeholder="Enter price"
                    value={price} onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image" className="my-2" >
                <Form.Label> Image </Form.Label>
                <Form.Control type="text" placeholder="Choose Image"
                    value={image} onChange={(e) => setImage(e.target.value)}>
                </Form.Control>
                <Form.Control type="file" onChange={uploadFileHandler}></Form.Control>
              </Form.Group>

              <Form.Group controlId="brand">  
                <Form.Label> Brand </Form.Label>
                <Form.Control type="text" placeholder="Enter brand"
                    value={brand} onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="countInStock">
                <Form.Label> Count In Stock </Form.Label>
                <Form.Control type="number" placeholder="Enter countInStock"
                    value={countInStock} onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label> Category </Form.Label>
                <Form.Control type="text" placeholder="Enter category"
                    value={category} onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label> Description </Form.Label>
                <Form.Control type="text" placeholder="Enter description"
                    value={description} onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary" className="my-3"> Update </Button>
            </Form>
          )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen;