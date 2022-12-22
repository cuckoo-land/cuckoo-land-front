export default function Alertmodal() {
  return (
    <>
      <input type="checkbox" id="alertmodal" className="modal-toggle" />
      <label htmlFor="alertmodal" className="modal">
        <label htmlFor="" className="modal-box relative min-h-[150px] max-h-[720px]">
          <label htmlFor="alertmodal" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <div className="mt-5 w-full flex flex-col space-y-8">
            {' '}
            <div className="overflow-x-auto w-full">
              <table className="table w-full">
                <tbody>
                  <tr>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src="/baseimage.png" alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">친구이름</div>
                          <div className="text-sm opacity-50">접속중</div>
                        </div>
                      </div>
                    </td>
                    <td>메세지 게임초대</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </label>
      </label>
    </>
  );
}
