const basket = require("./Basket");

const idGenerator = () => {
  const id = basket ? Math.max(...basket.map((product) => product.id)) : 0;
  return id + 1;
};

module.exports = idGenerator;
