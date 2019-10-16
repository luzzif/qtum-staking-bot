import "@babel/polyfill";
import { bot } from "./bot";
import { handleGetRichness } from "./commands/get-richness";
import express from "express";
import fetch from "node-fetch";
import { APP_URL } from "./env";

bot.command("getRichness", handleGetRichness);
bot.startPolling();

express().get("/", (request, response) => response.status(204).send());

setInterval(() => {
    fetch(APP_URL);
}, 60000);
