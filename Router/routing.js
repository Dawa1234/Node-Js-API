const express = require("express");
const router = express.Router();

const data = require("../Router/route-controller");

// Import Data from Other class
const userData = require("../Data/data");

router
  .route("/:id")
  .get(data.getData)
  .post((req, res) => {
    res.send(`Creating Id: ${req.params.id}`);
  });
//   .put()
//   .delete();

router.param("id", (req, res, next, id) => {
  console.log(userData.detail);
  req.user = userData.detail[id];
  next();
});

module.exports = router;
