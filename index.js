require("dotenv").config();
const express = require("express");
const bookRouter = require("./Router/books-router");
const categoryRouter = require("./Router/category-router");
const mongoose = require("mongoose");
const userRoute = require("./Router/user-route");
const auth = require("./Middleware/auth");
const app = express();

// Should be in sequence.

// Application level Middleware.
// app.use((req, res, next) => {
//   console.log(`${req.path}${req.method}`);
//   next();
// });

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/C29A")
  .then(() => {
    console.log("Connected to the database Successfully");
  })
  .catch((err) => console.log(err));

// In-built Middleware. [Decode json object]
app.use(express.json());

// Router level middleware.
app.use("/user", userRoute);
// app.use(auth.verifyUser);
app.use("/category", categoryRouter);
app.use("/books", bookRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log("Executed");
  // console.log(err.stack);
  // res.json("Executed");
  res.status(500).json(err.message);
  // res.json({ err: err.message });
});

// app.get("/", (req, res) => {
//   console.log(`${req.method}${req.path}`);
//   res.send("From '/' path [Get Method] (Success!)");
// });

// app.post("/book", (res) => {
//   res.send("Book Responded");
// });

app.listen(3000, () => {
  console.log("App is running on port 3000!");
});

// const fs = require("fs");
// // const date  = require('date-fns');
// const path = require("path");

// // Asynchronous File
// fs.readFile("./example.txt", (err, data) => {
//   if (err) console.log("Error occured here <---");
//   console.log("From fs.readFile.....");
//   console.log(data.toString());
// });

// // Asynchronous File [Better]
// fs.readFile(path.join(__dirname, "example.txt"), (err, data) => {
//   if (err) console.log("Error occured here <---");
//   console.log("From fs.readFile.....");
//   console.log(data.toString());
// });

// // Synchronous File
// console.log("Consoling...");
// var data = fs.readFileSync("./example.txt");
// console.log(data.toString());

// // Writin File
// fs.writeFileSync(path.join(__dirname, "test.txt"), "Writing file...", (err) => {
//   if (err) console.log(err);
//   console.log("File Successfully Created!");
// });

// // Append File
// fs.appendFile(path.join(__dirname, "test.txt"), "\n Appended!", (err) => {
//   if (err) console.log(err);
//   console.log("Successfully Appended!");
// });

// console.log("------------------------------------------");
// console.log(new Date());
// console.log("------------------------------------------");
// console.log(date.format(new Date(), 'yyyy-MM-dd'));
