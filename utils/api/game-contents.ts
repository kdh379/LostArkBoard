// 1. news 데이터를 를 가져오는 api
// 2. axios 를 사용하여 호출
// 3. AxiosResponse<NoticeType[]> 를 사용하여 타입을 지정

import { request } from "./request";

export const getContentsCalendar = () => {
    return request({
        apiPathKey: "game-contents.calendar",
    });
};
