const basket = require("./BasketData");

const idGenerator = () => {
  const id =
    basket.length > 0 ? Math.max(...basket.map((product) => product.id)) : 0;
  return id + 1;
};

module.exports = idGenerator;
