import asyncHandler from '../middleware/asyncHandler.js';
import Product from "../models/productModel.js";

const GetProductbyID = (asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
    console.error(product);
  }
  else {
    res.status(404);
    throw new Error("Item Not Found");
  }
}));

const Getproducts = (asyncHandler(async(req, res) => {
  const products = await Product.find();

  if (products)
    res.json(products);
  else {
    res.status(404);
    throw new Error("Page Not Found");
  }
}));

const createProduct = (asyncHandler(async(req, res) => {

  try {
    const product = new Product({
      name: 'sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'sample brand',
      category: 'sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createProduct);
    
  } catch (error) {
    console.error(error);
    res.status(404);
    throw new Error("Page Not Found");
  }
}));

const updateProduct = asyncHandler(async(req, res) => {
  
  try { 
    const {
      name, price, description,
      image, brand, category,
      countInStock
    } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (product) {
      product.name = name,
      product.price = Number(price),
      product.image = image,
      product.brand = brand,
      product.category = category,
      product.description = description,
      product.countInStock = Number(countInStock)
    }
    
    const updateProduct = await product.save();
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(404);
    console.log(error);
    throw new Error('Could not Update');
  }
});

const deleteProduct = asyncHandler(async(req, res) => {
  
  try {
    
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne({ _id: product._id });
      res.status(200).json({ message: "Product deleted" });
    }
    else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(404);
    console.log(error);
    throw new Error('Could not Update');
  }
});

const createProductReview = asyncHandler(async(req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id).exec();

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      comment,
      rating: Number(rating),
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = Number(product.reviews.reduce((acc, review) =>
                      acc + review.rating, 0) / product.reviews.length);
    await product.save();
    res.status(201).json({ message: "Review has Created"});
  }
  else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { GetProductbyID, Getproducts,
          createProduct, updateProduct,
            deleteProduct, createProductReview };