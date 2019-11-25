const env = require("@mondora/env");

const NODE_ENV = env("NODE_ENV", { default: "development" });
if (NODE_ENV !== "production") {
    require("dotenv").config();
}

exports.ADDRESSES = env("ADDRESSES", {
    required: true,
    parse: fusedAddresses => fusedAddresses.split(";")
});

exports.INITIAL_AMOUNT = env("INITIAL_AMOUNT", {
    required: true
});

exports.CRYPTO_COMPARE_API_KEY = env("CRYPTO_COMPARE_API_KEY", {
    required: true
});

exports.FIAT_CURRENCY = env("FIAT_CURRENCY", { required: true });

exports.BOT_TOKEN = env("BOT_TOKEN", {
    required: true,
    nonProductionDefault: "test-token"
});

exports.BOT_USERNAME = env("BOT_USERNAME", {
    required: true,
    nonProductionDefault: "test-username"
});
