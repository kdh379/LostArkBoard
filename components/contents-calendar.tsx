import { Button, Card, List, Spin, Tag } from "antd";

import { useEffect, useState } from "react";
import { getContentsCalendar } from "utils/api/game-contents";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import {
    convertContents,
    getClosestEvent,
    getItemKeyword,
    itemColor,
} from "utils/script/contents-converter";
import { dateFormat, timeFormat } from "utils/script/time-format";
import classNames from "classnames";
import useSWR from "swr";

const CALENDAR_CATEGORY_NAME = [
    "점령 이벤트",
    "카오스게이트",
    "유령선",
    "필드보스",
    "모험 섬",
    "로웬-툴루비크",
    "로웬-습격",
];

interface ContentsCalendarItemProps {
    contentList: ClosestContentsListType[];
}

const ContentsCalendarItem = (props: ClosestContentsListType) => {
    const { ContentsName, RewardItems, isNextEvent } = props;

    return (
        <List.Item key={ContentsName}>
            <List.Item.Meta
                title={
                    // <div className="flex justify-between">
                    <div
                        className={classNames("flex justify-between", {
                            "opacity-50": !isNextEvent,
                        })}
                    >
                        <div>{ContentsName}</div>
                        <div>
                            {getItemKeyword(RewardItems).map((keyword) => (
                                <Tag key={keyword} color={itemColor[keyword]}>
                                    {keyword}
                                </Tag>
                            ))}
                        </div>
                    </div>
                }
            />
        </List.Item>
    );
};

const ContentsCalendarTitle = (props: ClosestEventType) => {
    const { CategoryName, ContentsList, StartTime, isClosed } = props;
    return (
        <List
            header={
                <div
                    className={classNames("flex justify-between strong--5", {
                        "opacity-50": isClosed,
                    })}
                >
                    <div>{CategoryName}</div>
                    <div>{timeFormat(new Date(StartTime))}</div>
                </div>
            }
            size="small"
            dataSource={ContentsList}
            renderItem={(item) =>
                ContentsList.length > 1 && (
                    <ContentsCalendarItem key={item.ContentsName} {...item} />
                )
            }
        >
            {/* {ContentsList.length > 1 && (
                <ContentsCalendarItem contentList={ContentsList} />
            )} */}
        </List>
    );
};

export const ContentsCalendar = () => {
    // const [contentsCalendar, setContentsCalendar] = useState<
    //     GameContentsType[]
    // >([]);
    const [targetDate, setTargetDate] = useState(new Date());

    const { data, isLoading } = useSWR(
        "contents-calendar",
        getContentsCalendar
    );

    const handlerPrevDate = () => {
        const prevDate = new Date(targetDate);
        prevDate.setDate(prevDate.getDate() - 1);
        if (prevDate.getDate() === new Date().getDate())
            setTargetDate(new Date());
        else {
            prevDate.setHours(0, 0, 0, 0);
            setTargetDate(prevDate);
        }
    };

    const handlerNextDate = () => {
        const nextDate = new Date(targetDate);
        nextDate.setDate(nextDate.getDate() + 1);
        if (nextDate.getDate() === new Date().getDate())
            setTargetDate(new Date());
        else {
            nextDate.setHours(0, 0, 0, 0);
            setTargetDate(nextDate);
        }
    };

    return (
        <div className="flex-1 flex flex-col gap-3 w-full min-w-[17rem]">
            <Card
                title={
                    <div className="flex justify-between items-center">
                        <div>콘텐츠 달력</div>
                        <div className="flex gap-3 items-center">
                            <LeftOutlined onClick={handlerPrevDate} />
                            {dateFormat(targetDate)}
                            <RightOutlined onClick={handlerNextDate} />
                        </div>
                    </div>
                }
                bodyStyle={{
                    paddingTop: 0,
                    paddingBottom: 0,
                }}
            >
                {isLoading || !data ? (
                    <Spin />
                ) : (
                    CALENDAR_CATEGORY_NAME.map((categoryName) => {
                        const events = getClosestEvent(
                            convertContents(data.data),
                            categoryName,
                            targetDate
                        );

                        return events.map((event) => (
                            <ContentsCalendarTitle
                                key={`${event.CategoryName} ${event.StartTime}`}
                                {...event}
                            />
                        ));
                    })
                )}
            </Card>
        </div>
    );
};
