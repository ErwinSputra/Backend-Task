const express = require("express");
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
  const id = Number(req.params.id);
  const product = basket.find((product) => id === product.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).end();
  }
});

router.post("/basket", (req, res) => {
  const data = req.body;
  if (!data.quantity) {
    return res.status(400).json({
      quantity: "Quantity is missing!",
    });
  }

  const newData = {
    id: idGenerator(),
    name: data.name,
    cost: data.cost, //Rupiah
    quantity: data.quantity,
    shortDescription: data.shortDescription,
  };
  basket.push(newData);
  res.json(basket);
});

router.put("/basket/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = basket.find((product) => id === product.id);
  if (product) {
    product.quantity = 5;
    res.json(product);
  } else {
    res.status(404).end();
  }
});

router.delete("/basket/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = basket.find((product) => product.id === id);
  if (product) {
    basket = basket.filter((product) => product.id != id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
