import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '@styles/globals.css';
import GlobalStyle from '@styles/GlobalStyles';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient();
  const { pathname } = router;
  const isStartPage = pathname === '/login' || pathname === '/join';

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      {isStartPage && (
        <audio autoPlay loop src="">
          <track default kind="captions" />
        </audio>
      )}
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
