import Document, { Html, Head, Main, NextScript } from "next/document";

export default class AppDocument extends Document {
    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="/public/favicon.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
