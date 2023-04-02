import { Card, List, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { getNotices } from "utils/api/news";
import useSWR from "swr";

const getColor = (type: string) => {
    switch (type) {
        case "공지":
            return "blue";
        case "점검":
            return "green";
        case "이벤트":
            return "yellow";
        default:
            return "";
    }
};

interface NoticesListProps {
    entities: NoticeEntities[];
}

const NoticesList = ({ entities }: NoticesListProps) => {
    const handlerRedirectNotice = (notice: NoticeEntities) => {
        window.open(notice.Link, "_blank");
    };

    return (
        <List
            itemLayout="horizontal"
            dataSource={entities}
            renderItem={(item) => (
                <List.Item
                    key={item.Title}
                    className="cursor-pointer opacity-75 hover:opacity-100"
                    onClick={() => handlerRedirectNotice(item)}
                >
                    <List.Item.Meta
                        title={<div>{item.Title}</div>}
                        description={
                            <div className="flex justify-between">
                                <div>
                                    <Tag color={getColor(item.Type)}>
                                        {item.Type}
                                    </Tag>
                                    {item.Date}
                                </div>
                            </div>
                        }
                    />
                </List.Item>
            )}
        ></List>
    );
};

export const Notices = () => {
    // const [notices, setNotices] = useState<NoticeEntities[]>([]);

    const { data, error, isLoading } = useSWR("/api/news/notices", getNotices);

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
                    <NoticesList entities={data.data.splice(0, 5)} />
                )}
            </Card>
        </div>
    );
};
