import { ContentsCalendar } from "@components/contents-calendar";
import { EventsCarousel } from "@components/events-carousel";
import { Helmet } from "@components/helmet";
import { Notices } from "@components/notices";

export const Home = () => {
    return (
        <>
            <Helmet title="로아보드" />
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div className="flex flex-col gap-3">
                    <EventsCarousel></EventsCarousel>
                    <ContentsCalendar></ContentsCalendar>
                </div>
                <Notices></Notices>
            </div>
            <div className="flex flex-wrap gap-5 justify-center items-top overflow-auto">
                <div className="flex-1"></div>
            </div>
        </>
    );
};

export default Home;
