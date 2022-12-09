import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import type { AppProps } from 'next/app';
import '@styles/globals.css';
import GlobalStyle from '@styles/GlobalStyles';
// import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  // const router = useRouter();
  // const { pathname } = router;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const isStartPage = pathname === '/login' || pathname === '/join';

  // useEffect(() => {
  //   if (!localStorage.getItem('accessToken')) {
  //     router.push('/login');
  //   }
  // }, []);
  const client = new QueryClient();
  return (
    <>
      {/* {isStartPage && (
        <audio autoPlay loop src="/intro-bgm.mp3">
          <track default kind="captions" />
        </audio>
      )} */}
      <QueryClientProvider client={client}>
        <GlobalStyle />
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
