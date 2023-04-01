import { Button, Card, List, Tag } from "antd";

import { useEffect, useState } from "react";
import { getContentsCalendar } from "utils/api/game-contents";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import {
    getClosestEvent,
    getItemKeyword,
    itemColor,
} from "utils/script/contents-converter";
import { dateFormat, timeFormat } from "utils/script/time-format";
import classNames from "classnames";

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
        <List.Item>
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
    const [contentsCalendar, setContentsCalendar] = useState<
        GameContentsType[]
    >([]);
    const [targetDate, setTargetDate] = useState(new Date());

    useEffect(() => {
        setContentsCalendar([]);

        const fetchContentsCalendar = async () => {
            const result = await getContentsCalendar();
            const resultList: GameContentsType[] = [];

            if (!result) return;

            result.data.forEach((data) => {
                const draft = data.RewardItems.map((item) => ({
                    ...item,
                }));

                if (data.CategoryName === "로웬") {
                    if (data.ContentsName.match("[습격]"))
                        data.CategoryName = "로웬-습격";
                    else data.CategoryName = "로웬-툴루비크";
                }

                const prev = resultList.find(
                    (result) => result.CategoryName === data.CategoryName
                );

                if (prev) {
                    // 이전 데이터보다 현재 데이터의 레벨이 높으면 기존 데이터를 초기화
                    const isHigherLevel = prev.MinItemLevel < data.MinItemLevel;
                    if (isHigherLevel) prev.ContentList = [];

                    // 로웬-습격은 레벨이 다르더라도 같은 데이터로 처리
                    if (data.CategoryName === "로웬-습격") return;

                    const prevContent = prev.ContentList.find(
                        (prevContent) =>
                            prevContent.ContentsName === data.ContentsName
                    );

                    if (prevContent) prevContent.RewardItems.concat(...draft);
                    else
                        prev.ContentList.push({
                            ContentsName: data.ContentsName,
                            StartTimes: data.StartTimes,
                            RewardItems: [...draft],
                        });
                } else
                    resultList.push({
                        CategoryName: data.CategoryName,
                        MinItemLevel: data.MinItemLevel,
                        ContentList: [
                            {
                                ContentsName: data.ContentsName,
                                StartTimes: data.StartTimes,
                                RewardItems: [...draft],
                            },
                        ],
                    });
            });

            setContentsCalendar(resultList);
        };

        fetchContentsCalendar();
    }, []);

    const handlerPrevDate = () => {
        const prevDate = new Date(targetDate);
        prevDate.setDate(prevDate.getDate() - 1);
        setTargetDate(prevDate);
    };

    const handlerNextDate = () => {
        const nextDate = new Date(targetDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setTargetDate(nextDate);
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
                {CALENDAR_CATEGORY_NAME.map((categoryName) => {
                    const events = getClosestEvent(
                        contentsCalendar,
                        categoryName,
                        targetDate
                    );

                    return events.map((event) => (
                        <ContentsCalendarTitle
                            key={`${event.CategoryName} ${event.StartTime}`}
                            {...event}
                        />
                    ));
                })}
            </Card>
        </div>
    );
};
