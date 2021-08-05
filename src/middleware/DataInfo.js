const dataInfo = (req, res, next) => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  console.log("Request type = " + req.method);
  console.log("Action time = " + today.toUTCString());
  next();
};

module.exports = dataInfo;
