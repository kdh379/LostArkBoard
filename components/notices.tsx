import { Card, List, Spin, Tag } from "antd";
import { getNotices } from "utils/api/news";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { MoreOutlined } from "@ant-design/icons";

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

// 날짜 포맷을 변경하는 함수
// Intl.DateTimeFormat()을 사용하여 구현
const getDateString = (date: string) => {
    const dateObj = new Date(date);
    return Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(dateObj);
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
                    className="cursor-pointer transition duration-500 ease-in-out hover:bg-active"
                    onClick={() => handlerRedirectNotice(item)}
                >
                    <List.Item.Meta
                        className="px-4"
                        title={<div className="ellipsis">{item.Title}</div>}
                        description={
                            <div className="flex justify-between">
                                <div>
                                    <Tag color={getColor(item.Type)}>
                                        {item.Type}
                                    </Tag>
                                    {getDateString(item.Date)}
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
    const [notices, setNotices] = useState<NoticeEntities[]>([]);

    const { data, error, isLoading } = useSWR("/api/news/notices", getNotices);

    const handlerRedirectNoticeList = () => {
        window.open(
            "https://lostark.game.onstove.com/News/Notice/List",
            "_blank"
        );
    };

    useEffect(() => {
        if (data) {
            setNotices(data.data.splice(0, 5));
        }
    }, [data]);

    return (
        <div className="flex-1 px-3 py-2">
            <Card
                className="bg-surface"
                bordered={false}
                size="small"
                title={
                    <div className="flex justify-between">
                        <div className="strong--5 py-4">공지사항</div>
                        {isLoading ? (
                            <Spin />
                        ) : (
                            <MoreOutlined
                                rotate={90}
                                title="더보기"
                                onClick={handlerRedirectNoticeList}
                            />
                        )}
                    </div>
                }
                bodyStyle={{ padding: 0 }}
            >
                {data && <NoticesList entities={notices} />}
            </Card>
        </div>
    );
};
