const express = require("express");
const myRoutes = require("./routes/BasketRouter");
const dataInfo = require("./middleware/DataInfo");
const App = express();
const port = 3000;

App.use(express.json());
App.use(dataInfo);
App.use(myRoutes);

App.listen(port, (req, res) => {
  console.log("App running on port " + port + "\n");
});
