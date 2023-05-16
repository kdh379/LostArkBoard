import { request } from "./request";

export const getNotices2 = () => {
    return request({
        apiPathKey: "news.notices",
    });
};

export const getEvents2 = () => {
    return request({
        apiPathKey: "news.events",
    });
};
