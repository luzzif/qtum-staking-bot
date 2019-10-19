import "@babel/polyfill";
import { bot } from "./bot";
import { handleGetRichness } from "./commands/get-richness";
import express from "express";
import fetch from "node-fetch";
import { APP_URL, PORT, BOT_USERNAME } from "./env";

bot.command(["gr", `gr@${BOT_USERNAME}`], handleGetRichness);
bot.startPolling();

express()
    .get("/", (request, response) => response.status(204).send())
    .listen(PORT);

setInterval(() => {
    fetch(APP_URL);
}, 60000);
