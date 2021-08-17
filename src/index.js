const express = require("express");
const myRoutes = require("./routes/BasketRouter");
const Logger = require("./middleware/Logger");
const mongoose = require("mongoose");
const App = express();
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/basketDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Succesfully connected to MongoDB.."))
  .catch((err) => console.erorr("Error connecting to MongoDB: ", err));

App.use(express.json());
App.use(Logger);
App.use(myRoutes);

App.listen(port, (req, res) => {
  console.log("App running on port " + port + "\n");
});
