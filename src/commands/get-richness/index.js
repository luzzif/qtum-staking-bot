const { reduce } = require("bluebird");
const { getQtumFromSatoshis } = require("../../utils/conversions");
const fetch = require("node-fetch");

exports.handleGetRichness = async context => {
    try {
        const totalBalance = getQtumFromSatoshis(
            await reduce(
                process.env.ADDRESSES,
                async (totalBalance, address) => {
                    const response = await fetch(
                        `https://qtum.info/api/address/${address}/balance`
                    );
                    if (!response.ok) {
                        throw new Error();
                    }
                    const balance = await response.json();
                    return (totalBalance += balance);
                },
                0
            )
        ).toFixed(2);
        const gainedBalance = (
            totalBalance - process.env.INITIAL_AMOUNT
        ).toFixed(2);
        const response = await fetch(
            `https://min-api.cryptocompare.com/data/price?fsym=QTUM&tsyms=${process.env.FIAT_CURRENCY}&api_key=${process.env.CRYPTO_COMPARE_API_KEY}`
        );
        if (!response.ok) {
            throw new Error();
        }
        const {
            data: { EUR: price }
        } = await response.json();
        const fiatBalance = (gainedBalance * price).toFixed(2);
        return context.replyWithMarkdown(
            `* Total balance: ${totalBalance}\n* Gained balance: ${gainedBalance}\n* Gained ${process.env.FIAT_CURRENCY}: ${fiatBalance}`
        );
    } catch (error) {
        return context.replyWithMarkdown(
            "An error occurred, please try again later..."
        );
    }
};
