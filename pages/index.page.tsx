import { Helmet } from "@components/helmet";

import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

interface HomeProps {
    results: MovieEntity[];
}

interface MovieEntity {
    id: string;
    poster_path: string;
    original_title: string;
}

const Home = ({ results }: HomeProps) => {
    const router = useRouter();

    return (
        <div className="container">
            <Helmet title="Home" />
            {results?.map((movie) => (
                <Link
                    href={`/movies/${movie.original_title}/${movie.id}`}
                    key={movie.id}
                >
                    <div
                        className="movie"
                        key={movie.id}
                        // onClick={() => onClick(movie)}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        ></img>
                        <h4>{movie.original_title}</h4>
                    </div>
                </Link>
            ))}
            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 20px;
                    gap: 20px;
                }
                .movie img {
                    max-width: 100%;
                    border-radius: 12px;
                    transition: transform 0.2s ease-in-out;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .movie:hover img {
                    transform: scale(1.05) translateY(-10px);
                }
                .movie h4 {
                    font-size: 18px;
                    text-align: center;
                }
            `}</style>
        </div>
    );
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

export default Home;
