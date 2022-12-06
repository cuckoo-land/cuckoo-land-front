import { useState } from 'react';
import Swal from 'sweetalert2';

export function Usersettingmodal() {
  const [attachment, setAttachment] = useState<string>();
  const [, setFileZero] = useState<File>();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const files = (target.files as FileList)[0];

    setFileZero(files);
    const reader = new FileReader();
    reader.onload = (finishedEvent) => {
      const resultImage = finishedEvent.target;
      const ImageDataURL = resultImage?.result;
      if (typeof ImageDataURL === 'string') {
        setAttachment(ImageDataURL);
      }
    };
    reader.readAsDataURL(files);
  };

  function unregister() {
    (async () => {
      const { value: getName } = await Swal.fire({
        title: '회원탈퇴',
        text: '닉네임을 입력해주세요',
        input: 'text',
        inputPlaceholder: '닉네임을 입력해주세요',
      });

      // 닉네임이랑 일치하는지 확인 후 api요청.
      if (getName) {
        Swal.fire({
          title: '정말로 그렇게 하시겠습니까?',
          text: '다시 되돌릴 수 없습니다. 신중하세요.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '승인',
          cancelButtonText: '취소',
          reverseButtons: true, // 버튼 순서 거꾸로
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('승인이 완료되었습니다.', '다음에 다시 찾아주세요', 'success');
          }
        });
      }
    })();
  }
  function modifyName() {
    (async () => {
      const { value: getName } = await Swal.fire({
        title: '닉네임 수정하기',
        text: '원하시는 닉네임을 입력해주세요',
        input: 'text',
        inputPlaceholder: '닉네임을 입력..',
      });

      // 이후 처리되는 내용.
      if (getName) {
        Swal.fire(` ${getName}`);
      } else if (!getName) {
        Swal.fire({ text: `닉네임을 입력해주세요` });
      }
    })();
  }
  return (
    <>
      <input type="checkbox" id="user-setting" className="modal-toggle" />
      <label htmlFor="user-setting" className="modal">
        <label htmlFor="" className="modal-box relative min-h-[150px] max-h-[720px]">
          <label htmlFor="user-setting" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <div className="mt-5 w-full flex flex-col space-y-6">
            <div className="block m-auto">
              <label htmlFor="image-setting">
                <input type="file" id="image-setting" className="modal-toggle" onChange={onFileChange} />
                {attachment ? (
                  <img className="mask mask-squircle" src={attachment} alt="기본이미지" width="64" height="64" />
                ) : (
                  <img className="mask mask-squircle" src="/baseimage.png" alt="기본이미지" width="64" height="64" />
                )}
              </label>
            </div>
            <button type="button" className="mt-3 btn" onClick={modifyName}>
              닉네임수정
            </button>
            <button type="button" className="btn" onClick={unregister}>
              회원탈퇴
            </button>
          </div>
        </label>
      </label>
    </>
  );
}
