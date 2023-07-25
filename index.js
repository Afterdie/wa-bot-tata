const qrcode = require("qrcode-terminal");
const cron = require("node-cron");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { processMessage } = require("./messageOperations");
const { dateSetter, dataSetter } = require("./dataread");
const { handleMailSend } = require("./mailHandler");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Server Started: ", new Date().toLocaleTimeString());
});

client.initialize();

const cronSequence = "0 23 * * *"; //makes it run at 2300 hrs everyday

cron.schedule(cronSequence, () => {
  dateSetter(new Date().toLocaleDateString());
  handleMailSend();
});

const patterns = {
  activation: /(!w)/g,
  mail: /(!mail)/g,
  report: /(!C)/g,
};

client.on("message", async (message) => {
  if (message.body.match(patterns.activation)) {
    if (message.body.match(patterns.report))
      dataSetter(processMessage(message));
    else if (message.body.match(patterns.mail)) {
      message.react("⌛");
      const reaction = await handleMailSend();
      message.react(reaction);
    }
  } //this will pass along the message component to the messageOperations file
});
