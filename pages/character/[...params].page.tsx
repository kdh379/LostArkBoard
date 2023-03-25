import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

interface DetailProps {
    results: MovieEntity[];
}

interface MovieEntity {
    id: string;
    poster_path: string;
    original_title: string;
}

export const Detail = ({ results }: DetailProps) => {
    const router = useRouter();

    const { id, original_title, poster_path } = results[0];

    return <div>{original_title || "Loading..."}</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { results } = await (
        await fetch("http://localhost:3000/api/movies")
    ).json();
    return {
        props: {
            results,
        },
    };
};

export default Detail;
