import "@babel/polyfill";
import { bot } from "./bot";
import { handleGetRichness } from "./commands/get-richness";
import { PORT, HEROKU_APP_NAME } from "./env";

console.log(`selected port is ${PORT}`);
console.log(`app name is ${HEROKU_APP_NAME}`);

const webhookPath = "/messages";
const webhookAddress = `https://${HEROKU_APP_NAME}:${PORT}${webhookPath}`;

console.log(`webhook address is ${webhookAddress}`);

bot.command("getRichness", handleGetRichness);
bot.startWebhook(webhookPath, null, PORT);
bot.telegram.setWebhook(webhookAddress);
