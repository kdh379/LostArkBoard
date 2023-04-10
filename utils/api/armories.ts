import { fetcherLoaAPI } from "./fetcher";

export const getProfiles = async (url: string) => {
    return await fetcherLoaAPI<ProfilesEntity>(url);
};
