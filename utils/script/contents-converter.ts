const getTimeAsTimeZone = (date: Date) => {
    const offsetMs = new Date().getTimezoneOffset() * 60 * 1000;
    return date.getTime() - offsetMs;
};

const nowTime = getTimeAsTimeZone(new Date());

export const getClosestEvent = (
    resultList: GameContentsType[],
    CategoryName: string
) => {
    let closestEvent: ClosestEventType[] = [];

    const contentList = resultList
        .find((result) => result.CategoryName === CategoryName)
        ?.ContentList.flatMap((content) => content);

    if (!contentList) return closestEvent;

    contentList.forEach((content) => {
        let minDiff = Infinity;
        let closestTime = "";

        content.StartTimes.forEach((time) => {
            if (getTimeAsTimeZone(new Date(time)) < nowTime) return;

            const timeDiff = Math.abs(
                getTimeAsTimeZone(new Date(time)) - nowTime
            );

            if (timeDiff < minDiff) {
                minDiff = timeDiff;
                closestTime = time;
            }
        });

        if (closestTime === "") return;

        // closestTime 이 오늘이 아닐 경우 return
        if (new Date(closestTime).getDate() !== new Date(nowTime).getDate())
            return;

        // content.RewardList 배열 안에서
        // StartTimes 배열 안에 closestTime 과 동일한 값을 가진 RewardItem 을 찾아서 closestEvent 에 넣는다.
        const RewardItems: string[] = [];
        content.RewardItems.forEach((reward) => {
            if (!reward.StartTimes || reward.StartTimes.includes(closestTime))
                RewardItems.push(reward.Name);
        });

        // closestEvent에 동일한 CategoryName 이 존재할 경우 ContentsList 에 추가한다.
        // closestEvent에 동일한 CategoryName 이 존재하지 않을 경우 새로운 객체를 생성하여 추가한다.
        const index = closestEvent.findIndex(
            (event) => event.CategoryName === CategoryName
        );
        if (index === -1) {
            closestEvent.push({
                CategoryName,
                StartTime: closestTime,
                ContentsList: [
                    {
                        ContentsName: content.ContentsName,
                        RewardItems,
                    },
                ],
            });
        }
        if (index !== -1) {
            closestEvent[index].ContentsList.push({
                ContentsName: content.ContentsName,
                RewardItems,
            });
        }
    });

    return closestEvent;
};

const itemKeyword = {
    "영혼의 잎사귀": "카드",
    골드: "골드",
    "해적 주화": "해적 주화",
} as { [key: string]: string };

export const itemColor = {
    카드: "green",
    골드: "yellow",
    "해적 주화": "orange",
    실링: "gray",
} as { [key: string]: string };

// 아이템 이름을 입력하면 아이템의 키워드를 반환한다.
export const getItemKeyword = (itemName: string[]) => {
    const keywordList: string[] = [];

    itemName.forEach((item) => {
        if (itemKeyword[item]) keywordList.push(itemKeyword[item]);
    });

    // keywordList 안에 값이 없으면 "기타"를 추가한다.
    if (keywordList.length === 0) keywordList.push("실링");
    return keywordList;
};
