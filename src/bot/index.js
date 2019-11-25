const { BOT_TOKEN } = require("../env");
const Telegraf = require("telegraf");

exports.bot = new Telegraf(BOT_TOKEN);
