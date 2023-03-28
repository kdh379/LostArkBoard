import { Card, List, Tag } from "antd";
import { useEffect, useState } from "react";
import { getContentsCalendar } from "utils/api/game-contents";
import { getClosestEvent, getItemKeyword } from "utils/converter";

const CALENDAR_CATEGORY_NAME = [
    "카오스게이트",
    "모험 섬",
    "유령선",
    "점령 이벤트",
    "로웬-습격",
    "필드보스",
];

export const ContentsCalendar = () => {
    const [contentsCalendar, setContentsCalendar] = useState<
        GameContentsType[]
    >([]);

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

    return (
        <div className="flex-1 flex flex-col gap-3 w-full max-w-xl min-w-[400px]">
            <Card
                title="컨텐츠 일정"
                bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
            >
                {CALENDAR_CATEGORY_NAME.map((categoryName) => {
                    const events = getClosestEvent(
                        contentsCalendar,
                        categoryName
                    );

                    return events.map((event) => (
                        <List
                            key={event.CategoryName}
                            header={
                                <div className="flex justify-between strong--5">
                                    <div>{event.CategoryName}</div>
                                    <div>{event.StartTime}</div>
                                </div>
                            }
                            dataSource={event.ContentsList}
                            renderItem={(item) =>
                                event.ContentsList.length > 1 && (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={
                                                <div className="flex justify-between">
                                                    <div>
                                                        {item.ContentsName}
                                                    </div>
                                                    <div>
                                                        <Tag>
                                                            {getItemKeyword(
                                                                item
                                                                    .RewardItems[
                                                                    item
                                                                        .RewardItems
                                                                        .length -
                                                                        1
                                                                ]
                                                            )}
                                                        </Tag>
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )
                            }
                        ></List>
                    ));
                })}
            </Card>
        </div>
    );
};
