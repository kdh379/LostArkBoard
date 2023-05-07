import axios from "axios";

import https from "https";

export const fetcherLoaAPI = async <T>(url: string, renderingSide: string) => {
    if (renderingSide === "server") {
        return await ssrInstance.request<T>({
            url,
            method: "GET",
            withCredentials: true,
        });
    } else {
        return await csrInstance.request<T>({
            url,
            method: "GET",
            withCredentials: true,
        });
    }
};

const ssrInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_LOA_API_PATH}`,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LOA_API_KEY}`,
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        secureProtocol: "TLSv1_2_method",
    }),
});

const csrInstance = axios.create({
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LOA_API_KEY}`,
    },
});
