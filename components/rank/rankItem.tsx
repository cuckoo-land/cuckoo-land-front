/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRouter } from 'next/router';

type RankItemProps = {
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
  isDetail?: boolean;
  gameType?: string;
};

export default function RankItem({ rankingNumber, userData, isDetail, gameType }: RankItemProps) {
  const router = useRouter();

  const handleRouteDetail = () => {
    router.push(
      {
        pathname: `/rank/detail`,
        query: { memberId: userData.memberId, rankingNumber, gameType },
      },
      '/rank/detail'
    );
  };

  const winCount = userData?.winNum.split('').reduce((acc, cur) => {
    if (Number(cur) > 0) {
      return acc + Number(cur);
    }
    return acc;
  }, 0);

  const gameCount = userData?.total;
  const winRate = Math.round((winCount / gameCount) * 100);

  return (
    <>
      {!isDetail ? (
        <div
          onClick={() => handleRouteDetail()}
          className="bg-woody_banner bg-no-repeat w-80 bg-cover bg-center mx-auto rounded-xl shadow-md cursor-pointer hover:opacity-90 hover:scale-[102%] hover:shadow-xl transition-all">
          <div className="flex flex-col justify-between h-full ">
            <div className="flex justify-between items-center p-5">
              {rankingNumber === 1 ? (
                <img src="/rank1.png" alt="rank" className="w-10 h-10 rounded-full" />
              ) : rankingNumber === 2 ? (
                <img src="/rank2.png" alt="rank" className="w-10 h-10 rounded-full" />
              ) : rankingNumber === 3 ? (
                <img src="/rank3.png" alt="rank" className="w-10 h-10 rounded-full" />
              ) : (
                <div className="font-bold text-white text-lg">{rankingNumber}위</div>
              )}
              <div className="flex w-3/5 gap-3">
                <img src="/bird.jpeg" alt="rank" className="w-12 rounded-full" />
                <span className="mt-4 text-white">{userData?.nickname}</span>
              </div>
              <div className="bg-rose-500 font-bold text-white rounded-md py-1 px-3 text-sm whitespace-nowrap flex justify-center items-center">
                {userData?.tier} BP
              </div>
            </div>
            <div className="px-5 pb-2">
              <div className="flex justify-between items-start">
                <div className="text-md text-yellow-100">
                  {userData?.memo ? userData.memo : '한 줄 메시지가 없습니다.'}
                </div>
                <div className="text-md text-rose-100">
                  {userData?.total}전 {winCount}승 <span className="text-rose-300">({winRate}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-woody_banner bg-no-repeat w-80 bg-cover bg-center mx-auto rounded-xl shadow-md">
          <div className="flex flex-col justify-between h-full ">
            <div className="flex justify-between items-center p-5">
              {rankingNumber === 1 ? (
                <img src="/rank1.png" alt="rank" className="w-10 h-10 rounded-full" />
              ) : rankingNumber === 2 ? (
                <img src="/rank2.png" alt="rank" className="w-10 h-10 rounded-full" />
              ) : rankingNumber === 3 ? (
                <img src="/rank3.png" alt="rank" className="w-10 h-10 rounded-full" />
              ) : (
                <div className="font-bold text-white text-lg">{rankingNumber}위</div>
              )}
              <div className="flex w-3/5 gap-3">
                <img src="/bird.jpeg" alt="rank" className="w-12 rounded-full" />
                <span className="mt-4 text-white">{userData?.nickname}</span>
              </div>
              <div className="bg-rose-500 font-bold text-white rounded-md py-1 px-3 text-sm whitespace-nowrap flex justify-center items-center">
                {userData?.tier} BP
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
