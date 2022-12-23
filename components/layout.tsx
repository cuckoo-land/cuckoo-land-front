import React from 'react';
// import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/header';

interface LayoutProps {
  // title?: string;
  // canGoBack?: boolean;
  // hasTabBar?: boolean;
  children: React.ReactNode;
  seoTitle?: string;
  isInGame?: boolean;
}

export default function Layout({ children, seoTitle, isInGame }: LayoutProps) {
  // const router = useRouter();
  // const onClick = () => {
  //   router.back();
  // };
  return (
    <div>
      <Head>
        <title>{seoTitle} | 쿠쿠랜드</title>
      </Head>

      {!isInGame && (
        <div className="w-full flex overflow-hidden items-center justify-center bg-[url('/intro-bgi.gif')] bg-cover">
          <Header />
          <div className="w-[640px] h-screen">{children}</div>
        </div>
      )}

      {isInGame && (
        <div className="w-full flex overflow-hidden items-center justify-center bg-[url('/majority_bgi.gif')] bg-cover">
          <div className="w-[640px] h-screen">{children}</div>
        </div>
      )}
    </div>
  );
}
