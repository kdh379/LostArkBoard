import { useRouter } from "next/router";

export const Detail = () => {
    const router = useRouter();
    console.log(router);

    return <div>{router.query.title || "Loading..."}</div>;
};

export default Detail;
