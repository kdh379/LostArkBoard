import { Carousel } from "antd";
import Image from "next/image";
import useSWR from "swr";
import { getEvents } from "utils/api/news";

export function EventsCarousel() {
    const { data, error, isLoading } = useSWR("/api/news/events", getEvents);

    const handlerRedirect = (link: string) => {
        window.open(link, "_blank");
    };

    return (
        <Carousel className="px-3 py-2" autoplay>
            {data?.data.map((item) => (
                <div
                    key={item.Title}
                    onClick={() => handlerRedirect(item.Link)}
                    className="cursor-pointer"
                >
                    <Image
                        src={item.Thumbnail}
                        alt={item.Title}
                        width={640}
                        height={160}
                        className="rounded-lg"
                    />
                </div>
            ))}
        </Carousel>
    );
}
