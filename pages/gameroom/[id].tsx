import Member from '@components/gameroom/member';
import Layout from '@components/layout';
import Button from '@components/button';
import Chat from '@components/gameroom/chat';
// import CommonModal from '@components/modal';
// import Header from '@components/header';
import Swal from 'sweetalert2';
// import Image from 'next/image';
import { useRouter } from 'next/router';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GameRoom() {
  const router = useRouter();

  const handleShareGameRoom = () => {
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
  const handleUpdateSetting = () => {
    // console.log('setting');
  };

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
      <Chat />
    </Layout>
  );
}

export default GameRoom;
