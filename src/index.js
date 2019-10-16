import "@babel/polyfill";
import { bot } from "./bot";
import { handleGetRichness } from "./commands/get-richness";
import { PORT, HEROKU_APP_NAME } from "./env";

const webhookPath = "/messages";

bot.command("getRichness", handleGetRichness);
bot.telegram.setWebhook(`https://${HEROKU_APP_NAME}:${PORT}${webhookPath}`);
bot.startWebhook(webhookPath, null, PORT);
