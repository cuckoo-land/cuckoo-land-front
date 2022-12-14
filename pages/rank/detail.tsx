import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { rankAPI } from 'api';

import Header from '@components/header';
import RankItem from '@components/rank/rankItem';

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

  const winCount = userData?.winNum?.split('').reduce((acc, cur) => {
    if (Number(cur) > 0) {
      return acc + Number(cur);
    }
    return acc;
  }, 0);
  const gameCount = userData?.total;
  const winRate = Math.round((winCount / gameCount) * 100);

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
            {gameType === 'mafia' && (
              <div className="p-2">
                <h2 className="p-1 bg-dark_banner bg-no-repeat bg-cover bg-center text-center text-lg text-white font-bold">
                  역할별 승리 정보
                </h2>
                <ul className="pt-2 flex flex-col gap-2 text-white">
                  <li>
                    <div className="flex gap-2">
                      <Image
                        className="rounded-full"
                        src="/image/bird/cuckoo.jpeg"
                        alt="mafia"
                        width={30}
                        height={30}
                      />
                      <div className="pt-2">
                        <span>마피아 버드 승리 </span>
                        <span className="bg-dark_button bg-no-repeat bg-cover bg-center px-3">
                          {userData?.winNum?.indexOf('0')}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex gap-2">
                      <Image
                        className="rounded-full"
                        src="/image/bird/citizen_bird.jpeg"
                        alt="mafia"
                        width={30}
                        height={30}
                      />
                      <div className="pt-2">
                        <span>시민 버드 승리 </span>
                        <span className="bg-dark_button bg-no-repeat bg-cover bg-center px-3">
                          {userData?.winNum?.indexOf('1')}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex gap-2">
                      <Image
                        className="rounded-full"
                        src="/image/bird/police_bird.jpeg"
                        alt="mafia"
                        width={30}
                        height={30}
                      />
                      <div className="pt-2">
                        <span>경찰 버드 승리 </span>
                        <span className="bg-dark_button bg-no-repeat bg-cover bg-center px-3">
                          {userData?.winNum?.indexOf('2')}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex gap-2">
                      <Image
                        className="rounded-full"
                        src="/image/bird/doctor_bird.jpeg"
                        alt="mafia"
                        width={30}
                        height={30}
                      />
                      <div className="pt-2">
                        <span>의사 버드 승리 </span>
                        <span className="bg-dark_button bg-no-repeat bg-cover bg-center px-3">
                          {userData?.winNum?.indexOf('3')}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            )}
            {gameType === 'majority' && (
              <div className="p-4">
                <h2 className="p-1 bg-dark_banner bg-no-repeat bg-cover bg-center text-center text-lg text-white font-bold">
                  칭호 획득 정보
                </h2>
                <ul className="pt-4 flex flex-col gap-4">
                  <li className="text-md text-yellow-300">
                    <span className="font-bold">트렌디 버드 </span>
                    <span className="bg-dark_button bg-no-repeat bg-cover bg-center px-3 text-white">
                      {userData?.winNum?.indexOf('0')}회
                    </span>
                    <p className="pt-2">가장 많은 다수결 승리 항목을 선택함</p>
                  </li>
                  <li className="text-md text-red-300">
                    <span className="font-bold">마이웨이 버드 </span>
                    <span className="bg-dark_button bg-no-repeat bg-cover bg-center px-3 text-white">
                      {userData?.winNum?.indexOf('1')}회
                    </span>
                    <p className="pt-2">가장 많은 다수결 패배 항목을 선택함</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
