const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const idGenerator = require("../utils/IdGenerator");
let basketData = require("../utils/BasketData");

mongoose
  .connect("mongodb://localhost:27017/basketDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(console.log("Succesfully connected to DB.."))
  .catch((err) => console.error(err));

const basketSchema = mongoose.Schema({
  name: String,
  cost: Number, //Rupiah
  quantity: Number,
  shortDescription: String,
});

const basket = mongoose.model("basket", basketSchema);

router.get("/", (req, res) => {
  res.send("Welcome to my Project :)");
});

router.get("/basket", (req, res) => {
  basket.find({}, function (err, docs) {
    if (err) console.log(err);
    // console.log("Success get all data");
    res.json(docs);
  });
});

router.get("/basket/:id", (req, res) => {
  const id = req.params.id;
  basket.findById(id, function (err, doc) {
    if (err) console.log(err);
    if (!doc) res.status(404).end();
    // console.log("Succes get the data");
    res.json(doc);
  });
});

router.post("/basket", (req, res) => {
  const data = req.body;
  if (!data.quantity) {
    return res.status(400).json({
      quantity: "Quantity is missing!",
    });
  }

  const newBasket = new basket({
    name: data.name,
    cost: data.cost,
    quantity: data.quantity,
    shortDescription: data.shortDescription,
  });

  newBasket.save();
  res.json(newBasket);
});

router.put("/basket/:id", (req, res) => {
  const id = req.params.id;
  basket.findByIdAndUpdate(id, { quantity: 5 }, function (err) {
    if (err) {
      console.log(err);
      res.status(404).end();
    }
    res.send("Update success!");
  });
});

router.delete("/basket/:id", (req, res) => {
  const id = req.params.id;

  basket.findByIdAndRemove(id, function (err) {
    if (err) {
      console.log(err);
      res.status(404).end();
    }
    res.status(204).send("Delete Success!");
  });
});

module.exports = router;
