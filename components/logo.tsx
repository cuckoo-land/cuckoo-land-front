import Image from 'next/image';
import { useRouter } from 'next/router';

interface ILogoProps {
  width?: number;
  height?: number;
  lang?: 'ko' | 'en';
}

export default function Logo({ width = 140, height = 40, lang = 'ko' }: ILogoProps) {
  const router = useRouter();
  return (
    <Image
      src={lang === 'ko' ? '/image/cuckoo_land_logo.png' : '/image/cuckoo_land_logo_en.png'}
      width={width}
      height={height}
      quality={100}
      blurDataURL="/image/cuckoo_land_logo.png"
      placeholder="blur"
      onClick={() => router.push('/lobby')}
    />
  );
}
