import env from "@mondora/env";

const NODE_ENV = env("NODE_ENV", { default: "development" });
if (NODE_ENV !== "production") {
    require("dotenv").config();
}

export const PORT = env("PORT", {
    required: true,
    nonProductionDefault: 8080
});

export const ADDRESSES = env("ADDRESSES", {
    required: true,
    parse: fusedAddresses => fusedAddresses.split(";")
});

export const INITIAL_AMOUNT = env("INITIAL_AMOUNT", {
    required: true
});

export const CRYPTO_COMPARE_API_KEY = env("CRYPTO_COMPARE_API_KEY", {
    required: true
});

export const FIAT_CURRENCY = env("FIAT_CURRENCY", { required: true });

export const BOT_TOKEN = env("BOT_TOKEN", {
    required: true,
    nonProductionDefault: "test-token"
});

export const APP_URL = env("APP_URL", {
    required: true,
    nonProductionDefault: "test-app-url"
});

export const BOT_USERNAME = env("BOT_USERNAME", {
    required: true,
    nonProductionDefault: "test-username"
});
