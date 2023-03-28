import { ContentsCalendar } from "@components/contents-calendar";
import { Helmet } from "@components/helmet";
import { Notices } from "@components/notices";

export const Home = () => {
    return (
        <>
            <Helmet title="로아보드" />
            <div className="flex flex-wrap gap-3 px-5 justify-center items-top max-h-full overflow-auto">
                <ContentsCalendar></ContentsCalendar>
                <Notices></Notices>
            </div>
        </>
    );
};

export default Home;
