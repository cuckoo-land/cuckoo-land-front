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
}

export default function Layout({ children, seoTitle }: LayoutProps) {
  // const router = useRouter();
  // const onClick = () => {
  //   router.back();
  // };
  return (
    <div>
      <Head>
        <title>{seoTitle} | 쿠쿠랜드</title>
      </Head>

      <div className="w-full flex overflow-hidden items-center justify-center bg-[url('/intro-bgi.gif')] bg-cover">
        <Header />
        <div className="w-[640px] h-screen">{children}</div>
      </div>
    </div>
  );
}
