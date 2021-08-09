const Logger = (req, res, next) => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  console.log("Request type = " + req.method);
  console.log("Path = " + req.path);
  console.log("Action time = " + today.toString() + "\n");
  next();
};

module.exports = Logger;
