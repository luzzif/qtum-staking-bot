const { Decimal } = require("decimal.js");

exports.getQtumFromSatoshis = satoshis =>
    new Decimal(satoshis).dividedBy(100000000).toNumber();
