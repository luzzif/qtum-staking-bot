exports.handler = (event, context, callback) => {
    try {
        const {
            handleGetLastValidatedBlock
        } = require("./commands/get-last-validated-block");
        const { handleGetRichness } = require("./commands/get-richness");

        const bot = new require("telegraf")(process.env.BOT_TOKEN);
        const botUsername = process.env.BOT_USERNAME;
        bot.command(["gr", `gr@${botUsername}`], handleGetRichness);
        bot.command(
            ["glvb", `glvb@${botUsername}`],
            handleGetLastValidatedBlock
        );

        bot.handleUpdate(JSON.parse(event.body));
        return callback(null, { statusCode: 204 });
    } catch (error) {
        console.log(error);
        return callback(null, { statusCode: 500 });
    }
};
