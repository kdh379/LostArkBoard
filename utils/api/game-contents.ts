// 1. news 데이터를 를 가져오는 api
// 2. axios 를 사용하여 호출
// 3. AxiosResponse<NoticeType[]> 를 사용하여 타입을 지정

import axios from "axios";
import { fetcherLoaAPI } from "./fetcher";

export const getContentsCalendar = async () => {
    return await fetcherLoaAPI<GameContentsEntities[]>(
        "/api/gamecontents/calendar"
    );
};
