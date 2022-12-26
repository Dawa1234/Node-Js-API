const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// Read File Promises
fs.readFile(path.join(__dirname, "example.txt"), (err, data) => {
  if (err) console.log(err);
  console.log("Read successfully!");
  // Write File
  fs.writeFile("./reply.txt", data, (err) => {
    if (err) console.log(err);
    console.log("Written successfully!");
    // Append File
    fs.appendFile("./reply.txt", "\nAppended!", (err) => {
      if (err) console.log(err);
      console.log("Appended successfully!");
      // Rename File
      fs.rename("./reply.txt", "./sixnine.txt", (err) => {
        if (err) console.log(err);
        console.log("Rename successfully!");
      });
    });
  });
});

// Using Prmoises
// fsPromises
//   .readFile("./example.txt", "utf-8")
//   .then((data) => {
//     console.log(data);
//     let dataEncoded = data.toString();
//     console.log(dataEncoded);
//     fsPromises
//       .writeFile("./sixnine.txt", "data")
//       .then((data) => {
//         console.log(data);
//         fsPromises
//           .appendFile("./sixnine.txt", "\nAppended from promises!")
//           .then((data) => {
//             console.log(data);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// await/async
const fileOperations = async () => {
  try {
    // Storing data.
    const data = await fsPromises.readFile("./example.txt", "utf-8");
    await fsPromises.writeFile("./sixnine.txt", data);
    await fsPromises.appendFile("./sixnine.txt", "\nAwait/async appended!");
    await fsPromises.rename("./sixnine.txt", "./ninesix.txt");
  } catch (e) {
    console.log(e);
  }
};

fileOperations();
