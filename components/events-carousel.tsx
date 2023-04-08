import { getEvents } from "utils/api/news";
import { Carousel } from "antd";
import useSWR from "swr";
import Image from "next/image";

export const EventsCarousel = () => {
    const { data, error, isLoading } = useSWR("/api/news/events", getEvents);

    const handlerRedirect = (link: string) => {
        window.open(link, "_blank");
    };

    return (
        <Carousel autoplay>
            {data?.data.map((item) => (
                <div
                    key={item.Title}
                    onClick={() => handlerRedirect(item.Link)}
                    className="cursor-pointer"
                >
                    <Image
                        src={item.Thumbnail}
                        alt={item.Title}
                        width={500}
                        height={160}
                        className="lg:rounded-xl"
                    />
                </div>
            ))}
        </Carousel>
    );
};
