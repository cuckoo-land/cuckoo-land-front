import Header from '@components/header';
import RankItem from '@components/rank/rankItem';
import { rankAPI } from 'api';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

type RankCardProps = {
  rankingNumber: number;
  userData: {
    memberId: string;
    memo: string;
    nickname: string;
    tier: number;
    total: number;
    winNum: string;
    winScore: number;
  };
};

interface IRankDetail {
  memberId: string;
  memo: string;
  nickname: string;
  tier: number;
  total: number;
  winNum: string;
  winScore: number;
}

export default function MafiaDetail() {
  const router = useRouter();
  const { memberId, rankingNumber, gameType } = router.query;

  let userData: IRankDetail = {
    memberId: '',
    memo: '',
    nickname: '',
    tier: 0,
    total: 0,
    winNum: '',
    winScore: 0,
  };

  const { data: mafiaData } = useQuery('getMafiaRankDetail', () => rankAPI.getMafiaRankDetail(memberId));
  const { data: majorityData } = useQuery('getMajorityRankDetail', () => rankAPI.getMajorityRankDetail(memberId));

  if (gameType === 'mafia') userData = mafiaData?.data;
  if (gameType === 'majority') userData = majorityData?.data;

  const winCount = userData?.winNum.split('').reduce((acc, cur) => {
    if (Number(cur) > 0) {
      return acc + Number(cur);
    }
    return acc;
  }, 0);
  const gameCount = userData?.total;
  const winRate = Math.round((winCount / gameCount) * 100);

  console.log(userData);
  return (
    <div className="bg-[url('/intro-bgi.gif')] flex flex-col items-center justify-center w-full h-screen">
      <Header isRankPage />
      <RankItem rankingNumber={Number(rankingNumber)} userData={userData} isDetail />
      <section className="bg-woody_modal bg-no-repeat bg-cover bg-center w-80 h-72 rounded-3xl mt-3 shadow-xl">
        <article className="flex flex-col justify-between h-full">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <p className="text-md text-yellow-100">{userData?.memo ? userData.memo : '한 줄 메시지가 없습니다.'}</p>
              <div className="p-2 bg-dark_banner bg-no-repeat bg-cover bg-center text-md text-rose-100">
                {userData?.total}전 {winCount}승 <span className="text-rose-300">({winRate}%)</span>
              </div>
            </div>
            <div className="p-4">
              <h2 className="p-1 bg-dark_banner bg-no-repeat bg-cover bg-center text-center text-lg text-white font-bold">
                역할별 승리 정보
              </h2>
              <ul className="pt-4 flex flex-col gap-4">
                <li className="text-md text-white ">
                  마피아 승리{' '}
                  <span className="bg-dark_button bg-no-repeat bg-cover bg-center px-3">
                    {userData?.winNum.indexOf('0')}
                  </span>
                </li>
                <li className="text-md text-white">
                  시민 승리{' '}
                  <span className="bg-dark_button bg-no-repeat bg-cover bg-center px-3">
                    {userData?.winNum.indexOf('1')}
                  </span>
                </li>
                <li className="text-md text-white">
                  경찰 승리
                  <span className="bg-dark_button bg-no-repeat bg-cover bg-center px-3">
                    {userData?.winNum.indexOf('2')}
                  </span>
                </li>
                <li className="text-md text-white">
                  의사 승리
                  <span className="bg-dark_button bg-no-repeat bg-cover bg-center px-3">
                    {userData?.winNum.indexOf('3')}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
