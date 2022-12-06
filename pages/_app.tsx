import type { AppProps } from 'next/app';
import '@styles/globals.css';
import GlobalStyle from '@styles/GlobalStyles';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Menubar from '@components/menubar/Menubar';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isStartPage = pathname === '/login' || pathname === '/join';

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Menubar />
      {/* {isStartPage && (
        <audio autoPlay loop src="/intro-bgm.mp3">
          <track default kind="captions" />
        </audio>
      )} */}
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
