// import * as stompjs from '@stomp/stompjs';
import { useCallback, useEffect, useRef, useState } from 'react';

import useStore from 'states/useStore';

interface WebRTCUser {
  id: string;
  stream: MediaStream;
}
export default function Member() {
  // const roomId: any = '1';
  const nickName = 'unknown'; // localStorage.getItem('nickname') ||
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream>();
  const [, setUsers] = useState<WebRTCUser[]>([]);
  const { stomp } = useStore();

  // const onValid = (data: { message: string }) => {
  //   console.log('메세지 보내기');
  //   if (stomp.client.connected) {
  //     stomp.client.publish({
  //       destination: `/topic/chat/room/1`,
  //       body: JSON.stringify({ sender: nickName, roomId: '1', type: 'TALK', message: data.message }),
  //     });
  //   }
  // };

  const getLocalStream = useCallback(async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 240,
          height: 240,
        },
      });
      localStreamRef.current = localStream;
      if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
      stomp.client.publish({
        destination: `/topic/chat/room/1`,
        body: JSON.stringify({ sender: nickName, roomId: '1', type: 'GETALLUSER' }),
      });
    } catch (e) {
      console.log(`getUserMedia error: ${e}`);
    }
  }, []);
  const createPeerConnection = useCallback((nickname: string) => {
    try {
      const pc = new RTCPeerConnection(stomp.config);

      pc.onicecandidate = (e) => {
        if (!e.candidate) return;
        console.log('onicecandidate');
        // 5
        stomp.client.publish({
          destination: `/topic/chat/room/1`,
          body: JSON.stringify({ sender: nickName, candidate: e.candidate, type: 'CANDIDATE' }),
        });
      };

      pc.oniceconnectionstatechange = (e) => {
        console.log(e);
      };

      pc.ontrack = (e) => {
        console.log('ontrack success');
        setUsers((oldUsers) =>
          oldUsers
            .filter((user) => user.id !== nickname)
            .concat({
              id: nickname,
              stream: e.streams[0],
            })
        );
      };

      if (localStreamRef.current) {
        console.log('localstream add');
        localStreamRef.current.getTracks().forEach((track) => {
          if (!localStreamRef.current) return;
          pc.addTrack(track, localStreamRef.current);
        });
      } else {
        console.log('no local stream');
      }

      return pc;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }, []);
  stomp.client.activate();
  useEffect(() => {
    getLocalStream();
    stomp.client.onConnect = () => {
      if (stomp.client.connected) {
        console.log('연결');
        stomp.client.subscribe(`/topic/chat/room/1`, (predata: any) => {
          const data = JSON.parse(predata.body);
          console.log(data);
          switch (data.type) {
            case 'ENTER':
              console.log('누군가들어왔어요', data.sender);

              break;
            case 'TALK':
              console.log('메세지가들어왔어요', data);
              break;
            case 'GETALLUSER':
              // data.alluser.forEach(async (user: any) => {
              //   if (!localStreamRef.current) return;
              //   const pc = createPeerConnection(user.id);
              //   if (!pc) return;
              //   pcsRef.current = { ...pcsRef.current, [user.id]: pc };
              //   try {
              //     const localOffer = await pc.createOffer({
              //       offerToReceiveAudio: true,
              //       offerToReceiveVideo: true,
              //     });
              //     await pc.setLocalDescription(new RTCSessionDescription(localOffer));
              //     stomp.client.publish({
              //       destination: `/topic/chat/room/1`,
              //       body: JSON.stringify({ sender: nickName, offer: localOffer, type: 'OFFER' }),
              //     });
              //   } catch (e) {
              //     console.error(e);
              //   }
              // });
              break;
            case 'OFFER':
              getoffer(data);
              break;
            case 'ANSWER':
              getAnswer(data);
              break;
            case 'CANDIDATE':
              getCandidate(data);
              break;
            case 'EXIT':
              console.log('누군가 나갑니다');
              break;
            default:
              break;
          }
        });

        console.log(stomp.client.connected);
        stomp.client.publish({
          destination: `/topic/chat/room/1`,
          body: JSON.stringify({ sender: nickName, type: 'ENTER', roomId: '1' }),
        });
      }
    };
    // return () => {
    //   console.log('나가기');
    //   if (stomp.client.connected) {
    //     console.log(stomp.client.connected);
    //     stomp.client.publish({
    //       destination: `/topic/chat/room/1`,
    //       body: JSON.stringify({ sender: '나갑니다', type: 'ENTER' }),
    //     });
    //     stomp.client.deactivate();
    //   }
    // };
  }, []);
  useEffect(() => {
    console.log('2');
    return () => {
      // if (stomp.client.connected) {
      //   console.log(stomp.client.connected);
      //   stomp.client.publish({
      //     destination: `/topic/chat/room/1`,
      //     body: JSON.stringify({ sender: '나갑니다', type: 'EXIT' }),
      //   });
      stomp.client.deactivate();
      // }
    };
  }, []);
  const getoffer = async (data: { offer: RTCSessionDescription; sender: string }) => {
    const { offer, sender } = data;
    console.log('get offer');
    if (!localStreamRef.current) return;
    const pc = createPeerConnection(sender);
    if (!pc) return;
    pcsRef.current = { ...pcsRef.current, [sender]: pc };
    try {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      console.log('answer set remote description success');
      const localAnswer = await pc.createAnswer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      });
      await pc.setLocalDescription(new RTCSessionDescription(localAnswer));
      stomp.client.publish({
        destination: `/topic/chat/room/1`,
        body: JSON.stringify({ sender: nickName, offer: localAnswer, type: 'ANSWER' }),
      });
    } catch (e) {
      console.error(e);
    }
  };
  const getAnswer = (data: { offer: RTCSessionDescription; sender: string }) => {
    const { offer, sender } = data;
    console.log('get answer');
    const pc: RTCPeerConnection = pcsRef.current[sender];
    if (!pc) return;
    pc.setRemoteDescription(new RTCSessionDescription(offer));
  };
  const getCandidate = async (data: { candidate: RTCIceCandidateInit; sender: string }) => {
    console.log('get candidate');
    const pc: RTCPeerConnection = pcsRef.current[data.sender];
    if (!pc) return;
    await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    console.log('candidate add success');
  };
  return (
    <div className="mt-20 h-1/2">
      <div className="grid grid-cols-4 gap-4 place-items-center h-2/3">
        {[...new Array(10)].map(() => (
          <div className="flex items-center justify-center bg-cover bg-woody_rounded_button h-28 w-28 rounded-xl">
            <div className="w-20 h-20 bg-cover rounded-full bg-cuckoo_character" />
          </div>
        ))}
      </div>
      <video className="w-[100px] h-[100px] m-[20px] rounded-lg bg-black" muted ref={localVideoRef} autoPlay />
    </div>
  );
}
