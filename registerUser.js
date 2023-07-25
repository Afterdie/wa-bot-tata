const fs = require("fs");

function saveFile(mediaRef) {
  fs.writeFile(
    "./upload/file1.png",
    Buffer.from(mediaRef.data, "base64"),
    (err) => {
      if (err) console.log("encountered an error: ", err);
      else console.log("file saved successfully");
    }
  );
  console.log(Buffer.from(mediaRef.data, "base64"));
}

async function handleNewUser(message) {
  if (message.hasMedia) {
    const mediaRef = await message.downloadMedia();
    console.log(mediaRef);
    saveFile(mediaRef);
  }
}

module.exports = { handleNewUser };
