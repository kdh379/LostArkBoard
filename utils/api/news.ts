// 1. news 데이터를 를 가져오는 api
import { fetcherLoaAPI } from "./fetcher";

export const getNotices = async () => {
    return await fetcherLoaAPI<NoticeEntities[]>("/api/news/notices", "client");
};

export const getEvents = async () => {
    return await fetcherLoaAPI<EventEntities[]>("/api/news/events", "client");
};
