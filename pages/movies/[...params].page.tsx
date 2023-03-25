import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

interface DetailProps {
    params: string[];
}

export const Detail = ({ params }: DetailProps) => {
    const router = useRouter();

    const [title, id] = params || [];

    return <div>{title || "Loading..."}</div>;
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
    return {
        props: {
            params: ctx.query.params,
        },
    };
};

export default Detail;
