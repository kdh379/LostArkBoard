import BoardList from "@components/board-list/board-list";
import { Helmet } from "@components/helmet";
import { Badge, List, Tag } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContentsCalendar } from "utils/api/game-contents";
import { getNotices } from "utils/api/news";

const CALENDAR_CATEGORY_NAME = [
    "카오스게이트",
    "모험 섬",
    "유령선",
    "점령 이벤트",
];

// 현재 시간을 ISO String으로 반환
const date = new Date();
const timezoneOffSet = date.getTimezoneOffset() * 60000;

export const Home = () => {
    const [notices, setNotices] = useState<NoticeEntities[]>([]);
    const [contentsCalendar, setContentsCalendar] = useState<
        GameContentsType[]
    >([]);

    useEffect(() => {
        setContentsCalendar([]);

        const fetchNotices = async () => {
            const notices = await getNotices();
            notices && setNotices(notices.data.splice(0, 5));
        };

        const fetchContentsCalendar = async () => {
            const result = await getContentsCalendar();

            if (!result) return;

            result.data.forEach((items) => {
                if (!CALENDAR_CATEGORY_NAME.includes(items.CategoryName))
                    return;

                setContentsCalendar((prev) => [
                    ...prev,
                    {
                        CategoryName: items.CategoryName,
                        Contents: items.RewardItems.map((item) => ({
                            ContentsName: items.ContentsName,
                            RewardItems: item.Name,
                            StartTimes: item.StartTimes,
                        })),
                    },
                ]);
            });
        };

        fetchNotices();
        fetchContentsCalendar();
    }, []);

    const handlerRedirectNotice = (notice: NoticeEntities) => {
        window.open(notice.Link, "_blank");
    };

    return (
        <>
            <Helmet title="로아보드" />
            <div className="flex flex-wrap gap-3 px-5 justify-center items-top max-h-full overflow-auto">
                <div className="flex-1 w-full max-w-xl min-w-[400px]">
                    <List
                        header={<div className="strong--base">캘린더</div>}
                        className="rounded-md shadow-md ring-1 ring-gray-800 ring-inset px-3"
                        itemLayout="horizontal"
                        dataSource={contentsCalendar}
                        renderItem={(item) => {
                            // return (
                            //     item.StartTime >
                            //         new Date(
                            //             date.getTime() - timezoneOffSet
                            //         ).toISOString() && (
                            //         <List.Item>
                            //             <List.Item.Meta
                            //                 title={item.CategoryName}
                            //                 description={item.StartTime}
                            //             />
                            //         </List.Item>
                            //     )
                            // );
                            return (
                                <List.Item>
                                    <List.Item.Meta
                                        title={`${item.CategoryName} ${[
                                            item.Contents.flatMap(
                                                (content) => content.RewardItems
                                            ),
                                        ]}`}
                                    ></List.Item.Meta>
                                </List.Item>
                            );
                        }}
                    ></List>
                </div>
                <div className="flex-1 max-w-xl min-w-[400px]">
                    <List
                        header={<div className="strong--base">공지사항</div>}
                        className="rounded-md shadow-md ring-1 ring-gray-800 ring-inset px-3"
                        itemLayout="horizontal"
                        dataSource={notices}
                        renderItem={(item) => (
                            <List.Item
                                onClick={() => handlerRedirectNotice(item)}
                                className="cursor-pointer opacity-75 hover:opacity-100"
                            >
                                <Tag
                                    color={
                                        item.Type === "공지"
                                            ? "blue"
                                            : item.Type === "점검"
                                            ? "green"
                                            : "red"
                                    }
                                >
                                    {item.Type}
                                </Tag>
                                <List.Item.Meta
                                    title={item.Title}
                                    description={item.Date}
                                />
                            </List.Item>
                        )}
                    ></List>
                </div>
            </div>
        </>
    );
};

export default Home;
