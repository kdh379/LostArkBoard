import { fetcherLoaAPI } from "./fetcher";

export const getArmories = async (url: string) => {
    return await fetcherLoaAPI<ArmoriesEntity>(url, "server");
};
