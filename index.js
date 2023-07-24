const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { processMessage } = require("./messageOperations");
const { dateSetter, dataSetter } = require("./dataread");
const { handleMailSend } = require("./mailHandler");

const client = new Client({
  authStrategy: new LocalAuth(),
});

console.log("runningg");
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();

const activationPattern = /(!\w)/g;
const mailPattern = /(!mail)/g;
const reportPattern = /(!C)/g;

dateSetter(new Date().toLocaleDateString());

client.on("message", async (message) => {
  if (message.body.match(activationPattern)) {
    if (message.body.match(reportPattern)) dataSetter(processMessage(message));
    else if (message.body.match(mailPattern)) {
      message.react("⌛");
      const reaction = await handleMailSend();
      message.react(reaction);
    }
  } //this will pass along the message component to the messageOperations file
});
