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

        // content.RewardList 배열 안에서
        // StartTimes 배열 안에 closestTime 과 동일한 값을 가진 RewardItem 을 찾아서 closestEvent 에 넣는다.
        const RewardItems: string[] = [];
        content.RewardItems.forEach((reward) => {
            if (!reward.StartTimes || reward.StartTimes.includes(closestTime))
                RewardItems.push(reward.Name);
        });

        closestEvent.push({
            ContentsName: content.ContentsName,
            StartTime: closestTime,
            RewardItems: RewardItems,
        });
    });
    return closestEvent;
};
