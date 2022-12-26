const express = require("express");
const userRoute = express.Router();
const User = require("../Model/userModel");
// To encrypt password. [One way hash]
const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");
// userRoute.route("/").get().post().put().delete();

userRoute.post("/register", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user != null) {
        res.status(404).json({ message: "User already registered." });
        return next();
      }
      //   Encrypt password
      bcryptjs.hash(req.body.password, 10, (err, hash) => {
        //   console.log(req.body.username);
        if (err) return next(err);
        // Created new user with hash password.
        user = new User({
          username: req.body.username,
          password: hash,
          role: req.body.role,
        });
        // Created new user with hash password.
        // user = new User();
        // user.username = req.body.username;
        // user.password = hash;

        user.save().then((user) => {
          res.status(201).json({
            status: "User registration success",
            userId: user._id,
            username: user.username,
            password: user.password,
            role: user.role,
          });
        });
      });
    })
    .catch((err) => next(err.message));
});

userRoute.delete("/", (req, res, next) => {
  User.deleteMany()
    .then((deleted) => {
      res.status(201).json({ message: "All users deleted" });
    })
    .catch((err) => next(err));
});

userRoute.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user == null) {
        res.status(404).json({
          message: "User does not exist",
        });
        return;
      }
      bcryptjs.compare(req.body.password, user.password, (err, success) => {
        if (err) return next(err);

        if (!success) {
          let err = new Error("Password does not match");
          return next(err.message);
        }
        let data = {
          userId: user._id,
          username: user.username,
          role: user.role,
        };
        // To generate token from a valid user.
        jwt.sign(
          data,
          process.env.SCERETE,
          { expiresIn: "1d" },
          (err, encoded) => {
            if (err) return next(err);
            console.log(encoded);
            res.status(201).json({
              userId: user._id,
              username: user.username,
              role: user.role,
              token: encoded,
            });
          }
        );
      });
    })
    .catch((err) => next(err));
});

module.exports = userRoute;
