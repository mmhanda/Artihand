import express from "express";
import products from "./data/productes.js"
import e from "express";
const Port = 5000;

const app = express();

app.get('/:num', (req, res) => {
  if (req.params.num == "pass") {
    res.send("hicsc");
  }
});

app.get('/api/products', (req, res) => {
  res.json(products);
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((e) => e._id == req.params.id)
  if (product) {
    res.json(product);
  }
  else {
    res.send("NOT FOUND");
  }
})


app.listen(Port, () => { console.log("server is runing....") });