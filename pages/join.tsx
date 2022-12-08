import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';

import Swal from 'sweetalert2';
import { handleToast } from '@utils/toast';
import { authAPI } from 'api';

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

  useEffect(() => {
    if (!id.length) setMessage('⚠️ 4자 이상의 아이디를 입력해주세요.');
    if (id.length >= 4) {
      authAPI
        .memberidCheck({ memberId: id })
        .then((response) => {
          if (response.status === 200) {
            setMessage('✅ 사용 가능한 아이디입니다.');
          }
        })
        .catch(({ response }) => {
          if (!response.data.msg) {
            setMessage('⚠️ 아이디 형식이 올바르지 않습니다.');
          } else {
            setMessage('❌ 이미 사용중인 아이디입니다.');
          }
        });
    }
  }, [id]);

  useEffect(() => {
    if (!nickname.length) setMessage('⚠️ 2자 이상의 닉네임을 입력해주세요.');
    if (nickname.length >= 2) {
      authAPI
        .nicknameCheck({ nickname })
        .then((response) => {
          if (response.status === 200) {
            setMessage('✅ 사용 가능한 닉네임입니다.');
          }
        })
        .catch(({ response }) => {
          if (!response?.data.msg) {
            setMessage('⚠️ 닉네임 형식이 올바르지 않습니다.');
          } else {
            setMessage('❌ 이미 사용중인 닉네임입니다.');
          }
        });
    }
  }, [nickname]);

  const joinData = {
    memberId: id,
    nickname,
    password,
  };

  const idRegExp = /^[a-zA-Z0-9]{4,16}$/;
  const nicknameRegExp = /^[가-힣a-zA-Z0-9]{4,16}$/;
  const passwordRegExp = /^(?=.*[a-z])(?=.*[0-9])[0-9A-Za-z$&+,:;=?@#|'<>.^*()%!-]{8,32}$/;

  const handleValidation = () => {
    if (!idRegExp.test(id)) {
      handleToast('info', '아이디는 4~16자의 영문, 숫자만 사용 가능합니다.');
      setMessage('⚠️ 아이디 형식이 올바르지 않습니다.');
      idRef.current?.focus();
      return false;
    }
    if (!nicknameRegExp.test(nickname)) {
      handleToast('info', '닉네임은 2~8자의 한글, 영문, 숫자만 사용 가능합니다.');
      setMessage('⚠️ 닉네임 형식이 올바르지 않습니다.');
      nicknameRef.current?.focus();
      return false;
    }
    if (!passwordRegExp.test(password)) {
      handleToast('info', '비밀번호는 8~32자의 영문, 숫자를 조합해야 합니다.');
      setMessage('⚠️ 비밀번호 형식이 올바르지 않습니다.');
      passwordRef.current?.focus();
      return false;
    }
    if (password !== confirmPassword) {
      handleToast('error', '비밀번호가 일치하지 않습니다!');
      setMessage('❌ 비밀번호가 일치하지 않습니다.');
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
      <img src="/cuckoo_land_logo_en.png" alt="logo" className="w-80" />
      <form
        className="bg-[#F6E3BD] border-2 rounded-3xl p-5 opacity-90 max-w-sm flex flex-col items-center justify-center shadow-lg"
        onSubmit={(e) => handleJoin(e)}>
        <label className="text-2xl font-bold text-[#573623] mb-2">아이디</label>
        <input
          className="w-80 h-10 px-2 mb-4 border-2 border-[#573623] bg-white rounded-md shadow-md"
          type="text"
          value={id}
          ref={idRef}
          onChange={(e) => setId(e.target.value)}
          placeholder="4~16자의 영문, 숫자를 입력해주세요."
          maxLength={16}
        />
        <label className="text-2xl font-bold text-[#573623] mb-2">닉네임</label>
        <input
          className="w-80 h-10 px-2 mb-4 border-2 border-[#573623] bg-white rounded-md shadow-md"
          type="text"
          value={nickname}
          ref={nicknameRef}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="2~8자의 한글, 영문, 숫자를 입력해주세요."
          maxLength={8}
        />
        <label className="text-2xl font-bold text-[#573623] mb-2">비밀번호</label>
        <input
          className="w-80 h-10 px-2 mb-4 border-2 border-[#573623] bg-white rounded-md shadow-md"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="8~32자의 영문, 숫자를 조합해주세요."
          ref={passwordRef}
          maxLength={32}
        />
        <input
          className="w-80 h-10 px-2 mb-5 border-2 border-[#573623] bg-white rounded-md shadow-md"
          type="password"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
          placeholder="비밀번호 확인"
          ref={confirmPasswordRef}
          maxLength={32}
        />
        <div className="h-10 px-2 text-base font-bold w-80" ref={messageRef}>
          {message}
        </div>
        <button
          className="w-80 h-10 px-2 border-2 border-[#573623] bg-[#9D6C3D] text-xl font-bold text-white rounded-md shadow-md"
          type="submit">
          가입 완료
        </button>
      </form>
      <button
        className="w-80 h-10 px-2 mt-4 border-2 border-[#573623] bg-[#DC8A39] text-xl font-bold text-white rounded-md shadow-md"
        type="button"
        onClick={() => router.push('/login')}>
        로그인 페이지로 이동
      </button>
    </div>
  );
}
