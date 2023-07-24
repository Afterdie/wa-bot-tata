const fs = require("fs");
const nodemailer = require("nodemailer");
const filePath = "./data.json";
const htmlFilePath = "./index.html";
require("dotenv").config();
var jsonData = [];

function fetchJSON() {
  const readData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(readData);
}

function fetchHTML() {
  const readData = fs.readFileSync(htmlFilePath, "utf-8");
  return readData;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.sender,
    pass: process.env.pass,
  },
});

async function handleMailSend() {
  jsonData = fetchJSON();
  const info = await transporter.sendMail({
    from: process.env.sender, // sender address
    to: process.env.receiver, // list of receivers
    subject: `${jsonData.date} Division Report`, // Subject line
    text: "Here is the report as requested !", // plain text body
    html: JSON.stringify(jsonData.sections), // html body
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = { handleMailSend };
