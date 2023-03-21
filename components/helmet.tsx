import Head from "next/head";
interface HeadComponentProps {
    title: string;
}

export const Helmet = (props: HeadComponentProps) => {
    const { title } = props;

    return (
        <Head>
            <title>{title} | LostArkBoard</title>
        </Head>
    );
};
