import { useRouter } from 'next/router';
import Image from 'next/image';

import Button from '@components/button';
import Swal from 'sweetalert2';

export default function InGameFooter() {
  const router = useRouter();

  const handleQuitGameRoom = () => {
    Swal.fire({
      title: '정말 게임을 나가시겠습니까?',
      text: '게임 도중 퇴장 시 패널티가 있을 수 있습니다.',
      showCancelButton: true,
      confirmButtonText: '나가기',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/lobby');
      }
    });
  };

  return (
    <div className="flex justify-between gap-1 mx-10 my-2">
      <div className="flex gap-1">
        <Image className="rounded-full" src="/image/bird/cuckoo.jpeg" width="50px" height="50px" />
        <Image className="rounded-full" src="/image/bird/cuckoo.jpeg" width="50px" height="50px" />
        <Image className="rounded-full" src="/image/bird/cuckoo.jpeg" width="50px" height="50px" />
        <Image className="rounded-full" src="/image/bird/cuckoo.jpeg" width="50px" height="50px" />
        <Image className="rounded-full" src="/image/bird/cuckoo.jpeg" width="50px" height="50px" />
      </div>
      <div className="w-20">
        <Button text="나가기" texture="white" onClick={handleQuitGameRoom} />
      </div>
    </div>
  );
}
