declare type APIInfo<
    T_Param = DefaultRecord,
    T_Response = unknown,
    T_Body = unknown
> = {
    url: string;
    method: string;
    paramType?: T_Param;
    responseType?: T_Response;
    bodyType?: T_Body;
};

declare type DefaultRecord = Record<string, string>;
declare type GetAPI<T_Param = unknown, T_Response = unknown> = APIInfo<
    T_Param,
    T_Response
>;
declare type GetAPIOnlyRes<T_Response> = APIInfo<DefaultRecord, T_Response>;

export interface APIPath {
    "character.armories": GetAPI<{ characterName: string }, ArmoriesEntity>;
    "news.events": GetAPIOnlyRes<EventEntity[]>;
    "news.notices": GetAPIOnlyRes<NoticeEntity[]>;
    "game-contents.calendar": GetAPIOnlyRes<GameContentsEntity[]>;
}

const API_PATH = Object.freeze<APIPath>({
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
});

export const getAPIInfo = <T extends keyof APIPath>(
    key: T,
    params?: APIPath[T]["paramType"]
) => {
    const { method } = API_PATH[key];
    const url = params
        ? Object.entries(params).reduce((url, [key, value]) => {
              return url.replace(`:${key}`, value);
          }, API_PATH[key].url)
        : API_PATH[key].url;

    return { url, method };
};
