import * as StompJs from '@stomp/stompjs';
import { IMessage } from '@stomp/stompjs';

export interface ISendData {
  [key: string]: any;
}

export interface ILog {
  type: string;
  [key: string]: any;
}

const WS_URL = 'ws://3.39.238.163/room';

export default function stomp(gameRoomId: string) {
  const client = new StompJs.Client({
    brokerURL: `${WS_URL}`,
    connectHeaders: {},
    onConnect: () => {
      client.subscribe(`/topic/majority/${gameRoomId}`, (data: IMessage) => {
        // const log: ILog = JSON.parse(data.body);
        // console.log(log);
        // if (log.type === 'ENTER' || log.type === 'CHAT') {
        //   //   setGameLog((props) => [log, ...props]);
        // }
        // else {
        //   setGameLog((props) => [log, ...props]);
        // }
      });
    },
  });

  const subscription = (callback: () => void) => client.subscribe(`/topic/majority/${gameRoomId}`, callback);

  const publish = ({ ...content }: ISendData, destination: string) => {
    if (!client.connected) return;
    client.publish({
      destination,
      body: JSON.stringify({
        ...content,
      }),
    });
  };

  const connect = () => {
    console.log('connect');
    if (!client.connected) {
      client.activate();
    }
    setTimeout(() => {
      publish({ nickname: 'cuckoo123', roomId: gameRoomId }, '/app/majority/enter');
    }, 3000);
  };
  const disconnect = () => {
    console.log('disconnect!');
    return client.deactivate();
  };

  return { subscription, publish, connect, disconnect };
}
