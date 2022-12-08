type RankCardProps = {
  rankingNumber: number;
};

export default function RankCard({ rankingNumber }: RankCardProps) {
  return (
    <div className="bg-woody_banner bg-no-repeat w-80 bg-cover bg-center mx-auto rounded-xl shadow-md cursor-pointer hover:opacity-90 hover:scale-[102%] hover:shadow-xl transition-all">
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
          <img src="/bird.jpeg" alt="rank" className="w-12 rounded-full mr-16" />
          <div className="bg-rose-500 font-bold text-white rounded-md py-1 px-3 text-sm whitespace-nowrap flex justify-center items-center">
            마스터 버드
          </div>
        </div>
        <div className="px-5 pb-2">
          <div className="flex justify-between items-start">
            <div className="text-md text-yellow-100">Most position : 뻐꾸기</div>
            <div className="text-md text-rose-100">
              10전 7승 <span className="text-rose-300">(70%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
