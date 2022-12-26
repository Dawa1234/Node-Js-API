const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  // Token send from the client side.
  if (!req.headers.authorization) {
    let err = new Error("Authorization token incorrect or missing!");
    return next(err);
  }

  // Token recieves as "Bearer wekwjehjk1h2312312j3h1k2hj3jh".
  const token = req.headers.authorization.split(" ")[1];

  // Verifying token.
  jwt.verify(token, process.env.SCERETE, (err, decoded) => {
    if (err) return next(err);
    // console.log(decoded);
    req.user = decoded;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.role != "Admin") {
    let err = new Error("Permission denied");
    res.status(403);
    return next(err);
  }
  next();
};

module.exports = { verifyUser, verifyAdmin };
