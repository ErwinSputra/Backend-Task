const mongoose = require("mongoose");
const Joi = require("joi");

const basketSchema = mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true }, //Rupiah
  quantity: { type: Number, required: true },
  shortDescription: { type: String, minlength: 20 },
});

const Basket = mongoose.model("basket", basketSchema);

const schema = Joi.object({
  name: Joi.string().alphanum().required(),
  cost: Joi.number().integer().min(5000).required(),
  quantity: Joi.number().min(1).required(),
  shortDescription: Joi.string(),
});

const validateBasket = (basket) => {
  return schema.validate(basket);
};

exports.Basket = Basket;
exports.validate = validateBasket;
