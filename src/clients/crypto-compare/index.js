import axios from "axios";

export const cryptoCompareClient = axios.create({
    baseURL: "https://min-api.cryptocompare.com"
});
