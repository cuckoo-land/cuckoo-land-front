import { Devicesettingmodal } from './Devicesettingmodal';
import { Usersettingmodal } from './Usersettingmodal';

export function Settingmodal() {
  return (
    <>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <label htmlFor="my-modal-5" className="modal">
        <label htmlFor="" className="modal-box relative min-h-[150px] max-h-[720px]">
          <label htmlFor="my-modal-5" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <div className="mt-5 w-full flex flex-col space-y-3">
            <label htmlFor="user-setting" className="btn">
              회원설정
            </label>
            <label htmlFor="device-setting" className="btn">
              장비설정
            </label>
          </div>
        </label>
      </label>
      <>
        <Usersettingmodal />
        <Devicesettingmodal />
      </>
    </>
  );
}
