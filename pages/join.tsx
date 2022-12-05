import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';

import { authAPI } from 'api';
import { Toast } from '@utils/toast';
import Swal from 'sweetalert2';

export default function Join() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [message, setMessage] = useState('모든 입력란을 작성하고 가입 완료를 눌러주세요!');

  const idRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/lobby');
    }
  }, []);

  const joinData = {
    id,
    nickname,
    password,
  };

  const idRegExp = /^[a-zA-Z0-9]{4,16}$/;
  const nicknameRegExp = /^[가-힣a-zA-Z0-9]{2,8}$/;
  const passwordRegExp = /^(?=.*[a-z])(?=.*[0-9])[0-9A-Za-z$&+,:;=?@#|'<>.^*()%!-]{8,32}$/;

  const handleToast = (message: string) => {
    Toast.fire({
      icon: 'error',
      title: message,
    });
  };

  const handleValidation = () => {
    if (!idRegExp.test(id)) {
      handleToast('아이디를 확인해주세요!');
      setMessage('아이디는 4~16자의 영문, 숫자만 사용 가능합니다.');
      idRef.current?.focus();
      return false;
    }
    if (!nicknameRegExp.test(nickname)) {
      handleToast('닉네임을 확인해주세요!');
      setMessage('닉네임은 2~8자의 한글, 영문, 숫자만 사용 가능합니다.');
      nicknameRef.current?.focus();
      return false;
    }
    if (!passwordRegExp.test(password)) {
      handleToast('비밀번호를 확인해주세요!');
      setMessage('비밀번호는 8~32자의 영문, 숫자를 조합해야 합니다.');
      passwordRef.current?.focus();
      return false;
    }
    if (password !== confirmPassword) {
      handleToast('비밀번호가 일치하지 않습니다!');
      setMessage('비밀번호가 일치하지 않습니다.');
      confirmPasswordRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleJoin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleValidation()) return;
    authAPI
      .join(joinData)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: '회원가입 성공!',
            text: '로그인 페이지로 이동합니다.',
            confirmButtonText: '확인',
          }).then((result) => {
            if (result.isConfirmed) router.push('/login');
          });
        }
      })
      .catch(({ response }) => {
        if (response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: '회원가입에 실패했습니다.',
            text: '다시 시도해주세요.',
            confirmButtonText: '확인',
          });
          console.dir(response);
        }
      });
  };

  return (
    <div className="bg-[url('/intro-bgi.gif')] flex flex-col items-center justify-center w-full h-screen">
      <form
        className="bg-[#F6E3BD] border-2 rounded-3xl p-5 opacity-90 max-w-sm flex flex-col items-center justify-center"
        onSubmit={(e) => handleJoin(e)}>
        <label className="text-2xl font-bold text-[#573623] mb-2">아이디</label>
        <input
          className="w-80 h-10 px-2 mb-4 border-2 border-[#573623] bg-white rounded-md"
          type="text"
          value={id}
          ref={idRef}
          onChange={(e) => setId(e.target.value)}
          placeholder="4~16자의 영문, 숫자를 입력해주세요."
          required
        />
        <label className="text-2xl font-bold text-[#573623] mb-2">닉네임</label>
        <input
          className="w-80 h-10 px-2 mb-4 border-2 border-[#573623] bg-white rounded-md"
          type="text"
          value={nickname}
          ref={nicknameRef}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="2~8자의 한글, 영문, 숫자를 입력해주세요."
          required
        />
        <label className="text-2xl font-bold text-[#573623] mb-2">비밀번호</label>
        <input
          className="w-80 h-10 px-2 mb-4 border-2 border-[#573623] bg-white rounded-md"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="8~32자의 영문, 숫자를 조합해주세요."
          ref={passwordRef}
          required
        />
        <input
          className="w-80 h-10 px-2 mb-6 border-2 border-[#573623] bg-white rounded-md"
          type="password"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
          placeholder="비밀번호 확인"
          ref={confirmPasswordRef}
          required
        />
        <div className="w-80 h-10 px-2 text-sm font-bold" ref={messageRef}>
          {message}
        </div>
        <button
          className="w-80 h-10 px-2 border-2 border-[#573623] bg-[#9D6C3D] text-xl font-bold text-white rounded-md"
          type="submit">
          가입 완료
        </button>
      </form>
      <button
        className="w-80 h-10 px-2 mt-4 border-2 border-[#573623] bg-[#DC8A39] text-xl font-bold text-white rounded-md"
        type="button"
        onClick={() => router.push('/login')}>
        로그인 페이지로 이동
      </button>
    </div>
  );
}