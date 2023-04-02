import axios from "axios";

export const fetcherLoaAPI = async <T>(url: string) => {
    try {
        return await axios.get<T>(url, {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_LOA_API_KEY}`,
            },
            method: "GET",
        });
    } catch (error) {
        console.error(error);
    }
};
