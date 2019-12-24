const { Decimal } = require("decimal.js");
const fetch = require("node-fetch");
const uuid = require("uuid");

exports.handleGetStakingStatus = async context => {
    try {
        const response = await fetch(`https://${process.env.NODE_IP}:3889`, {
            method: "POST",
            body: JSON.stringify({
                jsonrpc: "1.0",
                id: uuid.v4(),
                method: "getstakinginfo",
                params: []
            }),
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${process.env.RPC_USER}:${process.env.RPC_PASSWORD}`
                ).toString("base64")}`
            }
        });
        if (!response.ok) {
            throw new Error();
        }
        const { result } = await response.json();
        const { enabled, staking, weight, expectedtime: expectedTime } = result;
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
    } catch (error) {
        console.error("error getting staking status", error);
        return context.replyWithMarkdown(
            "An error occurred, please try again later..."
        );
    }
};
