import express from 'express';
import products from '../data/productes.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/:id', (req, res) => {
  const product = products.find((e) => e._id == req.params.id)
  console.log(req.params.id);
  if (product)
    res.json(product);
  else {
    res.send("Data Not found!");
  }
});

router.get('/', (req, res) => {
  res.json(products);
});

export default router;