import React from 'react';
import Link from 'next/link';
import { cls } from '@utils/cls';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
  seoTitle?: string;
}

export default function Layout({ title, canGoBack, hasTabBar, children, seoTitle }: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div>
      <Head>
        <title>{seoTitle} | 쿠쿠랜드</title>
      </Head>
      <div className="flex items-center justify-center">
        <div className="w-[640px] h-screen bg-[#F6E3BD]">{children}</div>
      </div>
    </div>
  );
}
