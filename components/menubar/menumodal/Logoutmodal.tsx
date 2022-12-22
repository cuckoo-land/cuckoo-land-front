import { handleToast } from '@utils/toast';

export default function LogoutModal() {
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    handleToast('success', '로그아웃 되었습니다.');
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
          <button className="btn m-auto block mt-5" type="button" onClick={logout}>
            {' '}
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
}
