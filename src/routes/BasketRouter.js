const express = require("express");
const App = express();
const router = express.Router();
const idGenerator = require("../utils/IdGenerator");
let basket = require("../utils/Basket");

router.get("/", (req, res) => {
  const maxId = idGenerator() - 1;
  res.send("Max index = " + maxId);
});

router.get("/basket", (req, res) => {
  res.send(basket);
});

router.get("/basket/:id", (req, res) => {
  const id = req.params.id;
  const product = basket.filter((product) => id == product.id);
  product.length > 0 ? res.send(product) : res.status(204).send();
});

router.post("/basket", (req, res) => {
  const data = req.body;
  data.id = idGenerator();
  basket.push(data);
  res.send(basket);
});

router.put("/basket/:id", (req, res) => {
  const id = req.params.id;
  const product = basket.filter((product) => id == product.id);
  if (product.length == 0) {
    res.status(204).send();
  } else {
    basket[id - 1].size = "XL";
    res.send(basket);
  }
});

router.delete("/basket/:id", (req, res) => {
  const id = req.params.id;
  const product = basket.filter((product) => id == product.id);
  basket = basket.filter((product) => product.id != id);
  product.length > 0 ? res.send(basket) : res.status(204).send();
});

module.exports = router;
