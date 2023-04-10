import { Helmet } from "@components/helmet";
import { Notices } from "@components/notices";
import { ContentsCalendar } from "./contents-calendar";
import { EventsCarousel } from "./event-carousel";

export const HomePage = () => {
    return (
        <>
            <Helmet title="로아보드" />
            <div className="grid sm:grid-cols-2 grid-cols-1">
                <div className="flex flex-col">
                    <EventsCarousel />
                    <ContentsCalendar />
                </div>
                <Notices></Notices>
            </div>
        </>
    );
};

export default HomePage;
