const date = require("date-fns");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

let uuid1 = uuid.v4();
let dateFormat = date.format(new Date(), "yyyy-MM-dd");

const createLogItem = (message) => {
  return `1. Uuid: ${uuid1} \n2. Date: ${dateFormat} \n--------${message}--------`;
};

const savelogEvents = (logItem) => {
  // console.log(fs.existsSync(__dirname, "logs"));
  if (!fs.existsSync(__dirname, "logs")) {
    fs.mkdir(path.join(__dirname, "logs"), (err) => {
      if (err) console.log(err);
      fs.writeFile(
        // Set Path to Write File
        path.join(__dirname, "logs", "log-events.txt"),
        // Data
        "------File Written------\n",
        // Handling Error
        (err) => {
          if (err) console.log(err);
        }
      );
    });
  }

  // Append File
  fs.appendFile(
    path.join(__dirname, "logs", "log-events.txt"),
    logItem,
    (err) => {
      if (err) console.log(err);
    }
  );
};

const logEvents = (message) => savelogEvents(createLogItem(message));

module.exports = { logEvents };
