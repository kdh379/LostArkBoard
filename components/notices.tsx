import { List, Tag } from "antd";
import { useEffect, useState } from "react";
import { getNotices } from "utils/api/news";

export const Notices = () => {
    const [notices, setNotices] = useState<NoticeEntities[]>([]);

    useEffect(() => {
        const fetchNotices = async () => {
            const notices = await getNotices();
            notices && setNotices(notices.data.splice(0, 5));
        };

        fetchNotices();
    }, []);

    const handlerRedirectNotice = (notice: NoticeEntities) => {
        window.open(notice.Link, "_blank");
    };

    return (
        <div className="flex-1 min-w-[14rem]">
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
    );
};
