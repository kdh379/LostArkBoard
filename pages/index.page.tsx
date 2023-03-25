import BoardList from "@components/board-list/board-list";
import { Helmet } from "@components/helmet";
import { useEffect, useState } from "react";
import { getNotices } from "utils/api/news";

export const Home = () => {
    const [notices, setNotices] = useState<NoticeType[]>([]);

    useEffect(() => {
        const fetchNotices = async () => {
            const notices = await getNotices();

            notices && setNotices(notices.data.splice(0, 5));
        };

        fetchNotices();
    }, []);

    const handlerRedirectNotice = (notice: NoticeType) => {
        window.open(notice.Link, "_blank");
    };

    return (
        <>
            <Helmet title="Character Search" />
            <div className="flex flex-col justify-center items-center max-h-full overflow-auto">
                <BoardList title="로스트아크 공지사항">
                    {notices.map((notice, index) => {
                        return (
                            <div
                                className="hover:text-gray-100 cursor-pointer"
                                key={index}
                                onClick={() => handlerRedirectNotice(notice)}
                            >
                                <div className="flex gap-2">
                                    <div>{notice.Type}</div>
                                    {notice.Title}
                                </div>
                            </div>
                        );
                    })}
                </BoardList>
            </div>
        </>
    );
};

export default Home;
