import React from "react";

import type { AppProps } from "next/app";

import "@styles/globals.scss";
import Head from "next/head";
import { Layout } from "@components/layout";

const AppMain = ({ Component, pageProps }: AppProps) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

const App = (props: AppProps) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
                />
            </Head>
            <div className="app">
                <main className="app-main">
                    <AppMain {...props} />
                </main>
            </div>
        </>
    );
};

export default App;
