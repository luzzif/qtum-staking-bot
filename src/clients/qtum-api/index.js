import axios from "axios";

export const qtumApiClient = axios.create({
    baseURL: "https://qtum.info/api/"
});
