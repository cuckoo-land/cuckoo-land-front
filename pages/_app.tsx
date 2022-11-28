import type { AppProps } from 'next/app';
import '@styles/globals.css';
import GlobalStyle from '@styles/GlobalStyles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
