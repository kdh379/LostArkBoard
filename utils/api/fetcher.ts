import axios from "axios";

import https from "https";

export const fetcherLoaAPI = async <T>(url: string) => {
    // try {
    //     return await axios.get<T>(url, {
    //         headers: {
    //             accept: "application/json",
    //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_LOA_API_KEY}`,
    //         },
    //         method: "GET",
    //     });
    // } catch (error) {
    //     console.error(error);
    // }
    return await instance.request<T>({
        url,
        method: "GET",
        withCredentials: true,
    });
};

const instance = axios.create({
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
