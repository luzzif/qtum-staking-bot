import "@babel/polyfill";
import { bot } from "./bot";
import { handleGetRichness } from "./commands/get-richness";
import express from "express";
import { PORT } from "./env";

bot.command("getRichness", handleGetRichness);
bot.launch();
express().listen(PORT);
