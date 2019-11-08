import { map } from "bluebird";
import { DateTime } from "luxon";
import { ADDRESSES } from "../../env"
import { qtumApiClient } from "../../clients/qtum-api"

export const handleGetLastValidatedBlock = async context => {
    try {
        const transactionLists = await map(ADDRESSES, async address => {
            // We assume that the latest stake tx is within the last 10 txs
            const { data } = await qtumApiClient.get(`/address/${address}/txs?limit=10&offset=0`);
            return data.transactions;
        });
        const transactions = [].concat(...transactionLists);

        const stakeTxsTimestamps = await map(transactions, async tx => {
            const { data } = await qtumApiClient.get(`/tx/${tx}`);
            if (data.isCoinstake) {
                return data.timestamp;
            }
        }).filter(tx => tx);

        const lastBlockDate = DateTime.fromSeconds(stakeTxsTimestamps[0]).toFormat("dd/LL/yyyy");
        return context.replyWithMarkdown(
            `Last block validated at ${lastBlockDate.toString()}`
        );
    } catch (error) {
        return context.replyWithMarkdown(
            "An error occurred, please try again later..."
        );
    }
}