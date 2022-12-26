const express = require("express");
const route = require("./Router/routing");
// const mongoose = require("mongoose");
const app = express();

app.use("/users", route);

app.get("/admin", authentication, (req, res) => {
  console.log(`Admin = ${req.admin}`);
  res.send("User Authenticated");
});

app.listen(3000);

function authentication(req, res, next) {
  if (req.query.admin === "true") {
    req.admin = true;
    next();
    return;
  }
  res.send("User not authenticatied!");
}

function loggin(req, res, next) {
  console.log("Logging in...");
  next();
}
