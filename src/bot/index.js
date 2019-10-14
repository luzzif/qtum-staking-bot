import { BOT_TOKEN } from "../env";
import Telegraf from "telegraf";

export const bot = new Telegraf(BOT_TOKEN);
