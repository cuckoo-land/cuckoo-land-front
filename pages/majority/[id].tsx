import { useEffect, useState } from 'react';

import Layout from '@components/layout';
import InGameHeader from '@components/majority/inGameHeader';
import SeletContent from '@components/majority/seletContent';
import InGameFooter from '@components/majority/inGameFooter';
import Chat from '@components/gameroom/chat';

import { handleToast } from '@utils/toast';

export default function MajorityGame() {
  const [time, setTime] = useState(30);
  // 모든 유저가 선택했는지 확인하는 state?
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime: number) => {
        if (prevTime === 0) handleNextRound();
        if (selected) handleNextRound();
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNextRound = () => {
    handleToast('info', '⏱ TIME OVER ‼️');
    // 다음 라운드로 넘어가는 로직?
    setTime(30);
  };

  return (
    <Layout seoTitle="다수결 게임" isInGame>
      <InGameHeader time={time} />
      <SeletContent />
      <InGameFooter />
      <Chat />
    </Layout>
  );
}
