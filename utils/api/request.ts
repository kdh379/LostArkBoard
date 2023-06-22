import axios from "axios";

import { APIInterface } from "./api-model";

type HttpRequestInfo = {
    method: "GET" | "POST";
    url: `/${string}`;
};

const URLDict: Record<keyof APIInterface, HttpRequestInfo> = {
    "character.armories": {
        url: "/armories/characters/:characterName",
        method: "GET",
    },
    "news.events": {
        url: "/news/events",
        method: "GET",
    },
    "news.notices": {
        url: "/news/notices",
        method: "GET",
    },
    "game-contents.calendar": {
        url: "/gamecontents/calendar",
        method: "GET",
    },
};

// TODO API URL 동적 반영 필요
const instance = axios.create({
    baseURL: "/api",
    headers: {
        accept: "application/json; charset=utf-8",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LOA_API_KEY}`,
    },
    // validateStatus: ( ) => true, //! ReactQuery가 onError를 캐치하지 못함
});

interface RequestOptions<T_Key extends keyof APIInterface> {
    key: T_Key;
    body?: APIInterface[T_Key]["request"];
    params?: APIInterface[T_Key]["params"];
}

const replaceUrlParams = (
    url: string,
    params: { [key: string]: string }
): string => {
    let replacedUrl = url;

    for (const key in params) {
        const paramKey = `:${key}`;
        const paramValue = params[key];
        replacedUrl = replacedUrl.replace(paramKey, paramValue);
    }

    return replacedUrl;
};

export async function request<T_Key extends keyof APIInterface>({
    key,
    body,
    params,
}: RequestOptions<T_Key>) {
    const { method, url } = URLDict[key];

    // TODO Axios에서 어떤 상황에서 throw 하는지? 4xx, 5xx
    const response = await instance.request<APIInterface[T_Key]["response"]>({
        // url 에서 :key 를 찾아서 params 의 key와 매칭시켜준다.
        url: params ? replaceUrlParams(url, params) : url,
        method,
        data: method !== "GET" && body ? body : undefined,
        withCredentials: true,
        timeout: 10000,
    });

    return response.data;
}
