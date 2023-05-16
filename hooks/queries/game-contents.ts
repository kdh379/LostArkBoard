import { useQuery } from "@tanstack/react-query";
import { getContentsCalendar } from "utils/api/game-contents";
import { getAPIInfo } from "utils/api/path";

export const useGameContentsCalendar = () => {
    return useQuery({
        queryKey: [getAPIInfo("game-contents.calendar")],
        queryFn: () => getContentsCalendar(),
    });
};
