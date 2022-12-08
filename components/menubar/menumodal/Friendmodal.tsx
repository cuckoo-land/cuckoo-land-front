import { FriendList } from '../Friendlist';

export function FriendModal() {
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal">
        <label htmlFor="" className="modal-box relative min-h-[300px] max-h-[720px]">
          <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <div className="mt-5 w-full">
            <FriendList />
          </div>

          <button type="button" className="btn ">
            같이 게임하기
          </button>
        </label>
      </label>
    </>
  );
}
