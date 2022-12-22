import { observable } from 'mobx';
import * as stompjs from '@stomp/stompjs';

export const stomp = observable({
  client: new stompjs.Client({
    brokerURL: 'ws://52.79.160.159/room',
  }),
  config: {
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
  },
});
