// 1. news 데이터를 를 가져오는 api
// 2. axios 를 사용하여 호출
// 3. AxiosResponse<NoticeType[]> 를 사용하여 타입을 지정

import axios from "axios";

export const getNotices = async () => {
    try {
        return await axios.get<NoticeEntities[]>(`/api/news/notices`, {
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
