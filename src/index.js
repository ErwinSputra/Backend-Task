const express = require("express");
const myRoutes = require("./routes/BasketRouter");
const Logger = require("./middleware/Logger");
const App = express();
const port = 3000;

App.use(express.json());
App.use(Logger);
App.use(myRoutes);

App.listen(port, (req, res) => {
  console.log("App running on port " + port + "\n");
});
