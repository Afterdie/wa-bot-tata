const fs = require("fs");
const filePath = "./data.json";

function dateSetter(date) {
  let jsonDateObject = `{\n\t\"date\": \"${date}\",\n\t\"sections\":[]\n}`;
  fs.writeFile(filePath, jsonDateObject, "utf-8", (writerr) => {
    if (writerr) console.log("error writing to file");
    else console.log("success setting date");
  });
}

function dataSetter(newObj) {
  fs.readFile(filePath, "utf-8", (err, readData) => {
    let jsonData = [];
    jsonData = JSON.parse(readData);
    jsonData.sections.push(newObj);
    const updatedJsonData = JSON.stringify(jsonData, null, 2);
    fs.writeFile(filePath, updatedJsonData, "utf-8", (writeerr) => {
      if (writeerr) {
        console.log("error writing file");
      } else console.log("successfully wrote to file");
    });
  });
}

module.exports = { dateSetter, dataSetter };
