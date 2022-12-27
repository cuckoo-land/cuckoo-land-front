export default function temp() {
  return 'hello';
}
// import * as StompJs from '@stomp/stompjs';
// import { IMessage } from '@stomp/stompjs';
// import { useContext } from 'react';
// import chatLog from 'stores/chatLog';

export interface ISendData {
  [key: string]: any;
}

export interface ILog {
  type: string;
  [key: string]: any;
}

// const WS_URL = 'ws://3.39.238.163/room';

// export default function stomp(gameRoomId: string) {
//   const { addLog } = useContext(chatLog);
//   const client = new StompJs.Client({
//     brokerURL: `${WS_URL}`,
//     connectHeaders: {},
//     onConnect: () => {
//       client.subscribe(`/topic/majority/${gameRoomId}`, (data: IMessage) => {
//         const log: ILog = JSON.parse(data.body);
//         console.log(log);
//         if (log.type === 'ENTER' || log.type === 'CHAT') {
//           addLog(log);
//         }
//         // else {
//         //   setGameLog((props) => [log, ...props]);
//         // }
//       });
//     },
//   });

//   const publish = ({ ...content }: ISendData, destination: string) => {
//     if (!client.connected) return;
//     client.publish({
//       destination: destination,
//       body: JSON.stringify({
//         ...content,
//       }),
//     });
//   };

//   const connect = () => {
//     console.log('connect');
//     if (!client.connected) {
//       client.activate();
//     }
//     setTimeout(() => {
//       publish({ nickname: 'cuckoo123', roomId: gameRoomId }, '/app/majority/enter');
//     }, 3000);
//   };
//   const disconnect = async () => {
//     console.log('disconnect!');
//     return client.deactivate();
//   };

//   return { publish, connect, disconnect };
// }
