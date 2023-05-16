import axios from "axios";
import { APIPath, getAPIInfo } from "./path";

export interface RequestArgs<T extends keyof APIPath> {
    apiPathKey: T;
    params?: APIPath[T]["paramType"];
    body?: APIPath[T]["bodyType"];
}

const instance = axios.create({
    baseURL: "/api",
    headers: {
        accept: "application/json; charset=utf-8",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LOA_API_KEY}`,
    },
    validateStatus: (_) => true,
});

export const request = <T extends keyof APIPath>({
    apiPathKey,
    params,
    body,
}: RequestArgs<T>) => {
    const { url, method } = getAPIInfo(apiPathKey, params);

    const response = instance.request<APIPath[T]["responseType"]>({
        url,
        method,
        data: method !== "GET" && body ? body : undefined,
        withCredentials: true,
    });

    return response;
};
