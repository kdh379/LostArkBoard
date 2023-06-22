import { useQuery } from "@tanstack/react-query";
import { request } from "@utils/api/request";

export const useGameContentsCalendar = () => {
    return useQuery({
        queryKey: ["game-contents.calendar"],
        queryFn: () =>
            request({
                key: "game-contents.calendar",
            }),
    });
};
