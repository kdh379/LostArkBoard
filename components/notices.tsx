import { Card, List, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { getNotices } from "utils/api/news";
import useSWR from "swr";

export const Notices = () => {
    // const [notices, setNotices] = useState<NoticeEntities[]>([]);

    const { data, error, isLoading } = useSWR("/api/news/notices", getNotices);

    const handlerRedirectNotice = (notice: NoticeEntities) => {
        window.open(notice.Link, "_blank");
    };

    return (
        <div className="flex-1 min-w-[16rem]">
            <Card
                size="small"
                title={<div className="strong--5 py-4">공지사항</div>}
                bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
            >
                {isLoading || !data ? (
                    <Spin />
                ) : (
                    <List
                        itemLayout="horizontal"
                        dataSource={data.data.splice(0, 5)}
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
                )}
            </Card>
        </div>
    );
};
