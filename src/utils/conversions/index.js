import Decimal from "decimal.js";

export const getQtumFromSatoshis = satoshis =>
    new Decimal(satoshis).dividedBy(100000000).toNumber();
