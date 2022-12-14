import { handleToast } from '@utils/toast';
import { authAPI } from 'api';
import { useRouter } from 'next/router';

export function LogoutModal() {
  const router = useRouter();
  const roleType = localStorage.getItem('roleType');

  const handleLogout = () => {
    if (roleType === 'GUEST') {
      authAPI
        .guestLogout()
        .then((response) => {
          if (response.status === 200) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('nickname');
            localStorage.removeItem('roleType');
            handleToast('success', '로그아웃 되었습니다.');
            router.push('/login');
          }
        })
        .catch(() => {
          handleToast('error', '로그아웃에 실패했습니다.');
        });
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('roleType');
      handleToast('success', '로그아웃 되었습니다.');
      router.push('/login');
    }
  };

  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold m-auto block">로그아웃 하시겠습니까?</h3>
          <button className="btn m-auto block mt-5" type="button" onClick={handleLogout}>
            {' '}
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
}
