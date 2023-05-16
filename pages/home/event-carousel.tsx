import Loading from "@components/loading";
import { Carousel } from "antd";
import { useNewsEvents } from "hooks/queries/news";
import Image from "next/image";

export function EventsCarousel() {
    const { data: response, isLoading } = useNewsEvents();

    const handlerRedirect = (link: string) => {
        window.open(link, "_blank");
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Carousel className="px-3 py-2" autoplay>
            {response?.data?.map((item) => (
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
