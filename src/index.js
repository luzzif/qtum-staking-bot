import "@babel/polyfill";
import { bot } from "./bot";
import { handleGetLastValidatedBlock } from "./commands/get-last-validated-block";
import { handleGetRichness } from "./commands/get-richness";
import express from "express";
import fetch from "node-fetch";
import { APP_URL, PORT, BOT_USERNAME } from "./env";
import { CronJob } from "cron";

bot.command(["gr", `gr@${BOT_USERNAME}`], handleGetRichness);
bot.command(["glvb", `glvb@${BOT_USERNAME}`], handleGetLastValidatedBlock);
bot.startPolling();

express()
    .get("/", (request, response) => response.status(204).send())
    .listen(PORT);

new CronJob("0 8-23 * * *", () => fetch(APP_URL));
