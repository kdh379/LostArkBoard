import { useQuery } from "@tanstack/react-query";
import { getNotices2, getEvents2 } from "utils/api/news";
import { getAPIInfo } from "utils/api/path";

export function useNewsEvents() {
    return useQuery({
        queryKey: [getAPIInfo("news.events")],
        queryFn: () => getEvents2(),
    });
}

export function useNewsNotices() {
    return useQuery({
        queryKey: [getAPIInfo("news.notices")],
        queryFn: () => getNotices2(),
    });
}
