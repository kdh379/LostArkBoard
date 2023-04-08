import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export const CharacterPage = () => {
    const router = useRouter();
    const { characterName } = router.query;

    return <div>{characterName}</div>;
};

// export const getServerSideProps: GetServerSideProps = async () => {
//     const { results } = await (
//         await fetch("http://localhost:3000/api/movies")
//     ).json();
//     return {
//         props: {
//             results,
//         },
//     };
// };

export default CharacterPage;
