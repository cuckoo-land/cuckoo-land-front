/* eslint-disable react/jsx-no-bind */
import Member from '@components/gameroom/member';
import Layout from '@components/layout';
import Button from '@components/button';
import Chat from '@components/gameroom/chat';
import Swal from 'sweetalert2';
import * as stompjs from '@stomp/stompjs';

import { useRouter } from 'next/router';
import { FormEvent, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnimateModal from '@components/animateModal';

function GameRoom() {
  interface chatList {
    sender: string;
    roomid: string;
    message: string;
  }

  let roomName: any;
  let userName: any;
  let messagey: any;

  const roomRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const [isOpenOption, setIsOpenOption] = useState(false);
  const [chatList, setChatList] = useState<chatList[]>([]);

  const handleShareGameRoom = () => {
    handleCopyClipBoard('FFFFFF');
    toast.success(`참여코드 'FFFFFF'가 복사되었습니다.`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };
  const handleUpdateSetting = () => setIsOpenOption((props) => !props);

  const handleQuitGameRoom = () => {
    Swal.fire({
      title: '이 방을 나가시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '나가기',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/lobby');
      }
    });
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };
  const client = new stompjs.Client({
    brokerURL: 'ws://52.79.160.159/room',
    reconnectDelay: 25000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    debug(str) {
      //   console.log(str);
    },
  });

  client.onConnect = function (frame) {
    console.log('hi', roomName);
    client.subscribe(`/topic/chat/room/1`, (res) => {
      const answer = JSON.parse(res.body);
      if (answer.type === 'TALK') {
        setChatList([...chatList, answer]);
      }
      //   setChat((pre) => pre.concat(res.body));
    });
  };
  client.onStompError = function (frame) {
    console.log('err', frame);
  };
  client.activate();

  function handleSendMSG(evnet: FormEvent) {
    evnet.preventDefault();
    if (messageRef.current) messagey = messageRef.current.value;
    console.log('clear!');
    client.publish({
      destination: `/topic/chat/room/1`,
      body: JSON.stringify({ sender: userName, roomId: roomName, type: 'TALK', message: messagey }),
    });
  }

  return (
    <Layout title="Gameroom" seoTitle="Gameroom">
      <ToastContainer />
      <Member />
      <div className="flex justify-between mx-10 my-2">
        <div>
          <div className="w-20">
            <Button text="공유하기" texture="white" onClick={handleShareGameRoom} />
          </div>
        </div>
        <div className="">
          <div className="w-20">
            <Button text="옵션" texture="white" onClick={handleUpdateSetting} />
          </div>
          <div className="w-20">
            <Button text="나가기" texture="white" onClick={handleQuitGameRoom} />
          </div>
        </div>
      </div>
      <Chat messageRef={messageRef} handleSendMSG={handleSendMSG} chatList={chatList} />
      {isOpenOption && (
        <AnimateModal isOpen={isOpenOption} setIsOpen={setIsOpenOption} chat>
          <div className="flex flex-col justify-around h-full">
            <div className="text-2xl font-bold">방 옵션 수정</div>
          </div>
        </AnimateModal>
      )}
    </Layout>
  );
}

export default GameRoom;
