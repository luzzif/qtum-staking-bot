import "@babel/polyfill";
import { bot } from "./bot";
import { handleGetRichness } from "./commands/get-richness";

bot.command("getRichness", handleGetRichness);
bot.launch();
