import { map } from "bluebird";
import { flatten, compact } from "lodash";
import { DateTime } from "luxon";
import { ADDRESSES } from "../../env"
import { qtumApiClient } from "../../clients/qtum-api"

export const handleGetLastStake = async context => {
    try {
        const transactions = flatten(await map(ADDRESSES, async address => {
            // We assume that the latest stake tx is within the last 10 txs
            const { data } = await qtumApiClient.get(`/address/${address}/txs?limit=10&offset=0`);
            return data.transactions;
        }));

        const stakeTxsTimestamps = compact(await map(transactions, async tx => {
            const { data } = await qtumApiClient.get(`/tx/${tx}`);
            if (data.isCoinstake === true) {
                return data.timestamp;
            }
        }));

        const lastStakeDate = DateTime.fromSeconds(stakeTxsTimestamps[0]).toFormat("dd/LL/yyyy");
        return context.replyWithMarkdown(
            `Last stake reward was at ${lastStakeDate.toString()}`
        );
    } catch (error) {
        return context.replyWithMarkdown(
            "An error occurred, please try again later..."
        );
    }
}