const { bot } = require("./bot");
const {
    handleGetLastValidatedBlock
} = require("./commands/get-last-validated-block");
const { handleGetRichness } = require("./commands/get-richness");
const { BOT_USERNAME } = require("./env");

bot.command(["gr", `gr@${BOT_USERNAME}`], handleGetRichness);
bot.command(["glvb", `glvb@${BOT_USERNAME}`], handleGetLastValidatedBlock);

exports.handler = (event, context, callback) => {
    bot.handleUpdate(JSON.parse(event.body));
    return callback(null, { statusCode: 204 });
};
