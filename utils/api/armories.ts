import { fetcherLoaAPI } from "./fetcher";

export const getArmoryProfile = async (url: string) => {
    return await fetcherLoaAPI<ProfilesEntity>(url);
};

export const getArmories = async (url: string) => {
    return await fetcherLoaAPI<ArmoriesEntity>(url);
};
