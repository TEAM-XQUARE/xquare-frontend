import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { SDSThemeProvider } from '@semicolondsm/react-emotion-theme';
import { Global } from '@emotion/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { globalStyles } from '../styles/globalStyles';

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: 0,
                        staleTime: 1000,
                        refetchInterval: 0,
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    );

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
                    rel="preload"
                    as="font"
                />
            </Head>
            <SDSThemeProvider mode="light-only">
                <Global styles={globalStyles} />
                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <ReactQueryDevtools initialIsOpen={false} position="top-left" />
                        <Component {...pageProps} />
                    </Hydrate>
                </QueryClientProvider>
            </SDSThemeProvider>
        </>
    );
}

export default MyApp;
