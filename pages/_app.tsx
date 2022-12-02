import type { AppProps } from 'next/app';
import '@styles/globals.css';
import GlobalStyle from '@styles/GlobalStyles';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;
  const isStartPage = pathname === '/login' || pathname === '/join';

  return (
    <>
      {isStartPage && (
        <audio autoPlay loop src="/intro-bgm.mp3">
          <track default kind="captions" />
        </audio>
      )}
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
