import { useEffect, useState } from 'react';
import Layout from '@components/layout';
import InGameHeader from '@components/majority/inGameHeader';
import SeletContent from '@components/majority/seletContent';
import InGameFooter from '@components/majority/inGameFooter';
import { handleToast } from '@utils/toast';
import { useRouter } from 'next/router';
import webstomp from 'webstomp-client';
import Button from '@components/button';
import ChattingModal from '@components/gameroom/chattingModal';
import { IChatRequest, IChatResponse } from 'types/websocketTypes';

export interface ILog {
  type: string;
  [key: string]: any;
}

const WS_URL = 'ws://3.39.238.163/room';

export default function MajorityGame() {
  const websocket = new WebSocket(WS_URL);
  const stomp = webstomp.over(websocket);
  const [time, setTime] = useState(60);
  const router = useRouter();

  // 모든 유저가 선택했는지 확인하는 state?
  const [selected, setSelected] = useState(false);
  const [isStart, setIsStart] = useState<boolean>(false);

  const [chatLog, setChatLog] = useState<IChatResponse[]>([]);
  const [gameLog, setGameLog] = useState<any[]>([]);

  const [onChatting, setOnChatting] = useState<boolean>(false);

  const enterMessage = () => {
    stomp.send('/app/majority/enter', JSON.stringify({ nickname: 'cuckoo123', roomId: router.query.id }));
  };

  const onStart = () => {
    stomp.send('/app/majority/start', JSON.stringify({ round: 'THIRTYTWO', gameType: 0, roomId: router.query.id }));
    setIsStart((props) => !props);
  };

  const handleChat = (data: IChatRequest) => {
    stomp.send('/app/majority/chat', JSON.stringify(data));
  };

  const socketSubscribe = () => {
    try {
      stomp.connect({}, () => {
        stomp.subscribe(`/topic/majority/${router.query.id}`, (data) => {
          const log = JSON.parse(data.body);
          if (log.type === 'CHAT') {
            setChatLog((props) => [log, ...props]);
          } else {
            setGameLog((props) => [log, ...props]);
          }
        });
        enterMessage();
      });
      console.log('connected!');
    } catch (error) {
      console.log(error);
    }
  };

  const waitForConnection = (stompClient: any, callback: any) => {
    setTimeout(() => {
      if (stompClient.ws.readyState === 1) {
        console.log('Connection is made');
        if (callback != null) {
          callback();
        }
      } else {
        console.log('wait for connection...');
        waitForConnection(stompClient, callback);
      }
    }, 250);
  };

  useEffect(() => {
    if (router.query?.id) {
      waitForConnection(stomp, socketSubscribe);
    }
    return () => {
      if (stomp.connected) {
        stomp.disconnect();
        console.log('disconnect');
      }
    };
  }, []);

  useEffect(() => {
    console.log(chatLog, gameLog);
  }, [chatLog, gameLog]);

  useEffect(() => {
    if (isStart) {
      const interval = setInterval(() => {
        setTime((prevTime: number) => {
          if (prevTime === 0) handleNextRound();
          if (selected) handleNextRound();
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isStart]);

  const handleNextRound = () => {
    handleToast('info', '⏱ TIME OVER ‼️');
    // 다음 라운드로 넘어가는 로직?
    setTime(30);
  };

  return (
    <>
      <Layout seoTitle="다수결 게임" isInGame>
        <InGameHeader time={time} />
        <SeletContent isStart={isStart} onStart={onStart} />
        <div className="flex justify-center w-full mt-2">
          <div className="w-36">
            <Button onClick={() => setOnChatting((props) => !props)} type="button" texture="woody" text="채팅보기" />
          </div>
        </div>
        <InGameFooter />
      </Layout>
      {onChatting ? (
        <ChattingModal isOpen={onChatting} setIsOpen={setOnChatting} chatLog={chatLog} handleChat={handleChat} />
      ) : null}
    </>
  );
}
