import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import Inter from '../../../../libs/common/src/fonts/Inter';
import GlobalStyle from '../components/globalstyles';

export const theme: DefaultTheme = {
  colors: {
    primary: '#111',
    secondary: '#0070f3',
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Material Registry" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <title>Material Registry</title>
      </Head>
      <>
        <Inter />
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </RecoilRoot>
      </>
    </>
  );
}
