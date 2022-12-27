// import { useContext, useEffect, useRef, useState } from 'react';
// import Layout from '@components/layout';
// import InGameHeader from '@components/majority/inGameHeader';
// import SeletContent from '@components/majority/seletContent';
// import InGameFooter from '@components/majority/inGameFooter';
// import Chat from '@components/gameroom/chat';
// import { handleToast } from '@utils/toast';
// import stomp from '@utils/stomp';
// import { useRouter } from 'next/router';
// import chatLog from 'stores/chatLog';

// export default function MajorityGame() {
//   const [time, setTime] = useState(60);
//   const router = useRouter();
//   const client = useRef<any>({});
//   // 모든 유저가 선택했는지 확인하는 state?
//   const [selected, setSelected] = useState(false);
//   const [isStart, setIsStart] = useState<boolean>(false);

//   const { chatLog: log } = useContext(chatLog);
//   console.log(log);

//   useEffect(() => {
//     client.current = stomp(String(router.query?.id));
//     client.current.connect();
//     return () => {
//       client.current.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     if (isStart) {
//       const interval = setInterval(() => {
//         setTime((prevTime: number) => {
//           if (prevTime === 0) handleNextRound();
//           if (selected) handleNextRound();
//           return prevTime - 1;
//         });
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [isStart]);

//   const handleNextRound = () => {
//     handleToast('info', '⏱ TIME OVER ‼️');
//     // 다음 라운드로 넘어가는 로직?
//     setTime(30);
//   };

//   return (
//     <Layout seoTitle="다수결 게임" isInGame>
//       <InGameHeader time={time} />
//       <SeletContent isStart={isStart} setIsStart={setIsStart} publish={client.current.publish} />
//       <InGameFooter />
//       <Chat />
//     </Layout>
//   );
// }

export default function Majority() {
  return <div>h1</div>;
}
