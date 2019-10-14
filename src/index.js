import "@babel/polyfill";
import { bot } from "./bot";
import { handleGetRichness } from "./commands/get-richness";
import express from "express";

bot.command("getRichness", handleGetRichness);
bot.launch();
express().listen(8080);
