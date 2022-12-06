import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';

import { authAPI } from 'api';
import { Toast } from '@utils/toast';
import Swal from 'sweetalert2';
import GuestModal from '@components/guestModal';

export default function Login() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [showModal, setShowModal] = useState(false);

  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/lobby');
    }
  }, []);

  const idRegExp = /^[a-zA-Z0-9]{4,16}$/;
  const passwordRegExp = /^(?=.*[a-z])(?=.*[0-9])[0-9A-Za-z$&+,:;=?@#|'<>.^*()%!-]{8,32}$/;

  const signinData = {
    memberId: id,
    password,
  };

  const handleToast = (message: string) => {
    Toast.fire({
      icon: 'error',
      title: message,
    });
  };

  const handleValidation = () => {
    if (!idRegExp.test(id)) {
      handleToast('아이디를 확인해주세요!');
      idRef.current?.focus();
      return false;
    }
    if (!passwordRegExp.test(password)) {
      handleToast('비밀번호가 올바르지 않습니다.');
      passwordRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleValidation()) return;
    authAPI
      .login(signinData)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('roleType', response.data.roleType);
          response.headers.authorization && localStorage.setItem('accessToken', response.headers.authorization);
          response.headers.refreshtoken && localStorage.setItem('refreshToken', response.headers.refreshtoken);
          router.push('/lobby');
        }
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: '로그인에 실패했습니다.',
          text: '다시 시도해주세요.',
          confirmButtonText: '확인',
        });
        console.dir(response);
      });
  };

  const handleJoinPage = () => {
    router.push('/join');
  };

  const handleGuestLogin = () => {
    authAPI
      .guestLogin({ nickname })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          localStorage.setItem('nickname', response.data.nickname);
          localStorage.setItem('roleType', response.data.roleType);
          response.headers.authorization && localStorage.setItem('accessToken', response.headers.authorization);
          response.headers.refreshtoken && localStorage.setItem('refreshToken', response.headers.refreshtoken);
          router.push('/lobby');
        }
      })
      .catch(({ response }) => {
        Swal.fire({
          icon: 'error',
          title: '게스트 로그인에 실패했습니다.',
          text: '다시 시도해주세요.',
          confirmButtonText: '확인',
        });
        console.dir(response);
      });
  };

  return (
    <div className="bg-[url('/intro-bgi.gif')] flex flex-col items-center justify-center w-full h-screen">
      <img src="/cuckoo_land_logo.png" alt="logo" className="w-80" />
      <form
        className="bg-[#F6E3BD] border-2 rounded-3xl p-5 opacity-90 max-w-sm flex flex-col items-center justify-center shadow-lg"
        onSubmit={(e) => handleLogin(e)}>
        <label className="text-2xl font-bold text-[#573623] mb-2">아이디</label>
        <input
          className="w-80 h-10 px-2 mb-4 border-2 border-[#573623] bg-white rounded-md shadow-md"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="4~16자의 영문, 숫자를 입력해주세요."
          required
        />
        <label className="text-2xl font-bold text-[#573623] mb-2">비밀번호</label>
        <input
          className="w-80 h-10 px-2 mb-4 border-2 border-[#573623] bg-white rounded-md shadow-md"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="8~32자의 영문, 숫자를 조합해주세요."
          required
        />
        <button
          className="w-80 h-10 px-2 border-2 border-[#573623] bg-[#9D6C3D] text-xl font-bold text-white rounded-md shadow-md"
          type="submit">
          로그인
        </button>
      </form>
      <button
        className="w-80 h-10 px-2 mt-4 border-2 border-[#573623] bg-[#DC8A39] text-xl font-bold text-white rounded-md shadow-md"
        type="button"
        onClick={handleJoinPage}>
        회원가입
      </button>
      <button
        className="w-80 h-10 px-2 mt-4 border-2 border-[#573623] bg-[#DC8A39] text-xl font-bold text-white rounded-md shadow-md"
        type="button"
        onClick={() => setShowModal(true)}>
        게스트 로그인
      </button>
      {showModal && (
        <GuestModal
          title="게스트 로그인"
          content={
            <input
              className="w-80 h-10 px-2 mb-2 border-2 border-[#573623] bg-white rounded-md"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="사용할 2~8자의 닉네임을 입력해주세요."
              required
            />
          }
          confirmText="로그인"
          cancelText="취소"
          onConfirm={() => handleGuestLogin()}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
