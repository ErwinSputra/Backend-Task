const express = require("express");
const router = express.Router();
const { Basket, validate } = require("../models/Baskets");

router.get("/", (req, res) => {
  res.send("Welcome to my Project :)");
});

router.get("/basket", async (req, res) => {
  try {
    await Basket.find({}, function (err, docs) {
      if (err) console.log(err);
      res.json(docs);
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/basket/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Basket.findById(id, function (err, doc) {
      if (err) {
        console.log(err);
        res.status(404).send("Id is not found!");
      }
      res.json(doc);
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/basket", async (req, res) => {
  const data = req.body;
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0]);

  const newBasket = new Basket({
    name: data.name,
    cost: data.cost,
    quantity: data.quantity,
    shortDescription: data.shortDescription,
  });

  try {
    await newBasket.save().then((savedBasket) => {
      res.json(savedBasket);
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/basket/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0]);

  const id = req.params.id;
  const body = req.body;
  // const updatedBasket = {
  //   name: body.name,
  //   cost: body.cost,
  //   quantity: body.quantity,
  //   shortDescription: body.shortDescription,
  // };

  try {
    await Basket.findByIdAndUpdate(id, body, function (err) {
      if (err) {
        console.log(err);
        res.status(404).end();
      }
      res.send("Update Success!");
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/basket/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Basket.findByIdAndRemove(id, function (err) {
      if (err) {
        console.log(err);
        res.status(404).end();
      }
      res.send("Delete Success!");
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
