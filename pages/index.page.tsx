import { ContentsCalendar } from "@components/contents-calendar";
import { EventsCarousel } from "@components/events-carousel";
import { Helmet } from "@components/helmet";
import { Notices } from "@components/notices";

export const Home = () => {
    return (
        <>
            <Helmet title="로아보드" />
            <div className="grid sm:grid-cols-2 grid-cols-1">
                <div className="flex flex-col gap-3">
                    <EventsCarousel></EventsCarousel>
                    <ContentsCalendar></ContentsCalendar>
                </div>
                <Notices></Notices>
            </div>
        </>
    );
};

export default Home;
