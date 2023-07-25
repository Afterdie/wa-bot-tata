const fs = require("fs");
const nodemailer = require("nodemailer");
const filePath = "./data.json";
const htmlFilePath = "./index.html";
require("dotenv").config();
var jsonData = [];
const htmlString = `<!DOCTYPE html>
<html>
<head>
  <title>Data Presentation</title>
  <style>
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>
  <h1>Data Presentation</h1>
  <table>
    <thead>
      <tr>
        <th>Division</th>
        <th>Timestamp</th>
        <th>Production</th>
        <th>Types</th>
        <th>Break</th>
        <th>Loss Reason</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>CC#1</td>
        <td>${jsonData.timestamp}</td>
        <td>7, 5, 7</td>
        <td>TMT, SEN</td>
        <td>2hrs 40mins (2:40pm - 5:20pm). Delay in startup for 4 moulds change, O/F pit jam removal & cooling chamber flushing.</td>
        <td>None.</td>
      </tr>
      <tr>
        <td>CC#1</td>
        <td>1690229282000</td>
        <td>7, 5, 7</td>
        <td>TMT, SEN</td>
        <td>2hrs 40mins (2:40pm - 5:20pm). Delay in startup for 4 moulds change, O/F pit jam removal & cooling chamber flushing.</td>
        <td>None.</td>
      </tr>
      <tr>
        <td>CC#3</td>
        <td>1690229276000</td>
        <td>7, 5, 7</td>
        <td>TMT, SEN</td>
        <td>2hrs 40mins (2:40pm - 5:20pm). Delay in startup for 4 moulds change, O/F pit jam removal & cooling chamber flushing.</td>
        <td>None.</td>
      </tr>
      <!-- Add rows for CC#2 and additional data for CC#3 if needed -->
    </tbody>
  </table>
</body>
</html>`;

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
  try {
    jsonData = fetchJSON();
    const info = await transporter.sendMail({
      from: process.env.sender, // sender address
      to: process.env.receiver, // list of receivers
      subject: `${jsonData.date} Division Report`, // Subject line
      text: "Here is the report as requested !", // plain text body
      html: htmlString, // html body
    });
    console.log("Mail was sent");
    return "✅";
  } catch (error) {
    console.log("Error sending the message: ", error);
    return "❌";
  }
}

module.exports = { handleMailSend };
