const { BOT_TOKEN } = require("../env");
const Telegraf = require("telegraf");

export const bot = new Telegraf(BOT_TOKEN);
