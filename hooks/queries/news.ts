import { useQuery } from "@tanstack/react-query";
import { request } from "@utils/api/request";

export function useNewsEvents() {
    return useQuery({
        queryKey: ["news.events"],
        queryFn: () => request({ key: "news.events" }),
    });
}

export function useNewsNotices() {
    return useQuery({
        queryKey: ["news.notices"],
        queryFn: () => request({ key: "news.notices" }),
    });
}
