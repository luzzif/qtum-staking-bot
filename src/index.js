exports.handler = async (event, context, callback) => {
    try {
        const bot = getConfiguredBot();
        await bot.handleUpdate(JSON.parse(event.body));
        return callback(null, { statusCode: 200, body: "" });
    } catch (error) {
        console.error("generic error handling telegram message", error);
        return callback(null, { statusCode: 500 });
    }
};

const getConfiguredBot = () => {
    const {
        handleGetLastValidatedBlock
    } = require("./commands/get-last-validated-block");
    const { handleGetRichness } = require("./commands/get-richness");
    const Telegraf = require("telegraf");

    const bot = new Telegraf(process.env.BOT_TOKEN);
    const botUsername = process.env.BOT_USERNAME;
    bot.command(["gr", `gr@${botUsername}`], handleGetRichness);
    bot.command(["glvb", `glvb@${botUsername}`], handleGetLastValidatedBlock);
    return bot;
};
