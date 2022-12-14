import Image from 'next/image';
import { useState } from 'react';

import Button from '@components/button';
import Header from '@components/header';
import RankList from '@components/rank/rankList';

export default function RankingPage() {
  const [gameType, setGameType] = useState('mafia');

  const handleGameType = (type: string) => {
    setGameType(type);
  };

  return (
    <div className="w-full h-full min-w-md mx-auto overflow-hidden flex justify-center bg-[url('/intro-bgi.gif')] bg-cover">
      <Header isRankPage />
      <div className="w-full flex justify-center flex-col h-fit mt-20 relative">
        <div className="flex flex-col justify-center items-center">
          <div className="max-w-80 flex justify-center space-x-3">
            <div className="w-1/2">
              <Button text="마피아 게임" onClick={() => handleGameType('mafia')} />
              {gameType === 'mafia' && (
                <Image className="" src="/up-arrow.png" alt="selected-menu" width="50px" height="50px" />
              )}
            </div>
            <div className="w-1/2">
              <Button text="다수결 게임" onClick={() => handleGameType('majority')} />
              {gameType === 'majority' && <Image src="/up-arrow.png" alt="selected-menu" width="50px" height="50px" />}
            </div>
          </div>
        </div>
        <RankList gameType={gameType} />
      </div>
    </div>
  );
}
