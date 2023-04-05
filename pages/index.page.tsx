import { ContentsCalendar } from "@components/contents-calendar";
import { Helmet } from "@components/helmet";
import { Notices } from "@components/notices";

export const Home = () => {
    return (
        <>
            <Helmet title="로아보드" />
            <div className="flex flex-wrap justify-center items-top overflow-auto">
                <ContentsCalendar></ContentsCalendar>
                <Notices></Notices>
            </div>
        </>
    );
};

export default Home;
