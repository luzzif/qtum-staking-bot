const { Decimal } = require("decimal.js");
const jayson = require("jayson");

exports.handleGetStakingStatus = async context => {
    try {
        const client = jayson.client.http(`http://${process.env.NODE_IP}:3888`);
        await client.request("getstakinginfo", [], (error, response) => {
            if (error) {
                console.error("error getting staking status", error);
                return context.replyWithMarkdown(
                    "An error occurred, please try again later..."
                );
            }
            const {
                enabled,
                staking,
                weight,
                expectedtime: expectedTime
            } = response.result;
            console.log(response);
            const messages = [];
            if (!enabled) {
                messages.push("Staking currently *not enabledé");
            } else {
                messages.push(
                    staking
                        ? "Staking currently enabled and *in progressé"
                        : "Staking currently enabled and *not in progress*"
                );
            }
            messages.push(`Current network weight: *${weight}*`);
            messages.push(
                `Expected time until next block: *${new Decimal(expectedTime)
                    .dividedBy(60)
                    .dividedBy(60)
                    .dividedBy(24)
                    .toFixed(2)}*`
            );
            return context.replyWithMarkdown(messages.join("\n- "));
        });
    } catch (error) {
        console.error("error getting staking status", error);
        return context.replyWithMarkdown(
            "An error occurred, please try again later..."
        );
    }
};
