/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRouter } from 'next/router';

type RankCardProps = {
  rankingNumber: number;
  userData: {
    nickname: string;
    tier: number;
    total: number;
    winNum: string;
    winScore: number;
  };
};

export default function RankItem({ rankingNumber, userData }: RankCardProps) {
  const router = useRouter();

  const handleRouteDetail = () => {
    router.push(`/rank/${userData.tier}`);
  };

  // const winCount = userData?.winNum.split('').reduce((acc, cur) => {
  //   if (Number(cur) > 0) {
  //     return acc + Number(cur);
  //   }
  //   return acc;
  // }, 0);
  // console.log(winCount);

  // const winRate = Math.round((winCount / userData.total) * 100);
  // console.log(winRate);

  return (
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
            <div className="text-md text-yellow-100">상태 메시지</div>
            <div className="text-md text-rose-100">
              {userData?.total}전 {userData?.winNum}승 <span className="text-rose-300">(???%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
