import { reduce } from "bluebird";
import {
    ADDRESSES,
    INITIAL_AMOUNT,
    FIAT_CURRENCY,
    CRYPTO_COMPARE_API_KEY
} from "../../env";
import { getQtumFromSatoshis } from "../../utils/conversions";
import { qtumApiClient } from "../../clients/qtum-api";
import { cryptoCompareClient } from "../../clients/crypto-compare";

export const handleGetRichness = async context => {
    try {
        const totalBalance = getQtumFromSatoshis(
            await reduce(
                ADDRESSES,
                async (totalBalance, address) => {
                    const { data: balance } = await qtumApiClient.get(
                        `/address/${address}/balance`
                    );
                    return (totalBalance += balance);
                },
                0
            )
        ).toFixed(2);
        const gainedBalance = (totalBalance - INITIAL_AMOUNT).toFixed(2);
        const {
            data: { EUR: price }
        } = await cryptoCompareClient.get("data/price", {
            params: {
                fsym: "QTUM",
                tsyms: FIAT_CURRENCY,
                api_key: CRYPTO_COMPARE_API_KEY
            }
        });
        const fiatBalance = (gainedBalance * price).toFixed(2);
        return context.replyWithMarkdown(
            `- Total balance: ${totalBalance}\n- Gained balance: ${gainedBalance}\n- Gained ${FIAT_CURRENCY}: ${fiatBalance}`
        );
    } catch (error) {
        console.log(error);
        return context.replyWithMarkdown(
            "An error occurred, please try again later..."
        );
    }
};
