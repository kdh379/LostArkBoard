import React from "react";

import type { AppProps } from "next/app";

import "@styles/globals.scss";
import Head from "next/head";
import { Layout } from "@components/layout";
import { ConfigProvider, theme } from "antd";

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
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    components: {
                        App: {
                            colorBgBase: "#181818",
                        },
                    },
                }}
            >
                <div className="app dark-mode">
                    <main className="app-main">
                        <AppMain {...props} />
                    </main>
                </div>
            </ConfigProvider>
        </>
    );
};

export default App;
