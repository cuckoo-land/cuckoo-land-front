import { rankAPI } from 'api';
import { useQuery } from 'react-query';
import RankItem from './rankItem';

type RankListProps = {
  gameType: string;
};

interface IRankList {
  memberId: string;
  memo: string;
  nickname: string;
  tier: number;
  total: number;
  winNum: string;
  winScore: number;
}

export default function RankList({ gameType }: RankListProps) {
  const { data: mafiaData } = useQuery('getMafiaRankList', () => rankAPI.getMafiaRankList());
  const { data: majorityData } = useQuery('getMajorityRankList', () => rankAPI.getMajorityRankList());

  const mafiaRankList: IRankList[] = mafiaData?.data;
  const majorityRankList: IRankList[] = majorityData?.data;

  console.log(mafiaRankList);
  console.log(majorityRankList);

  return (
    <div
      className="w-full flex flex-col max-h-[100vh] pb-16
           justify-start space-y-3 overflow-y-scroll mt-8 scrollbar-hide">
      {gameType === 'mafia' && (
        <>
          {mafiaRankList?.map((data, index) => (
            <RankItem
              key={data.nickname}
              rankingNumber={index + 1}
              userData={data}
              isDetail={false}
              gameType={gameType}
            />
          ))}
        </>
      )}
      {gameType === 'majority' && (
        <>
          {majorityRankList?.map((data, index) => (
            <RankItem
              key={data.nickname}
              rankingNumber={index + 1}
              userData={data}
              isDetail={false}
              gameType={gameType}
            />
          ))}
        </>
      )}
    </div>
  );
}
