// 날짜 데이터 포맷을 바꿔주는 함수
// yyyy-mm-ddThh:mm:ss.sssZ => hh:mm
// 포맷 구조는 intl.DateTimeFormat()을 참고

export const timeFormat = (date: Date) => {
    const time = new Date(date).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    return time;
};

// yyyy-mm-ddThh:mm:ss.sssZ => `dd(week)`
// 포맷 구조는 intl.DateTimeFormat()을 참고
export const dateFormat = (date: Date) => {
    const time = new Date(date).toLocaleDateString("ko-KR", {
        weekday: "short",
        day: "numeric",
    });

    return time;
};
