import type {} from 'next/';
import React, { useRef, useState } from 'react';
// import { cls } from '@utils/cls';
import { FriendModal } from './menumodal/Friendmodal';
import { LogoutModal } from './menumodal/Logoutmodal';
import { Settingmodal } from './menumodal/Settingmodal';
import { Alertmodal } from './menumodal/Alertmodal';

export default function Menubar() {
  const drawerRef = useRef<HTMLInputElement>(null);
  const [, setDrawer] = useState<boolean>();
  const onChangeDrawer = () => {
    if (drawerRef.current && drawerRef.current.checked) {
      setDrawer(drawerRef.current.checked);
    } else {
      drawerRef.current && setDrawer(!drawerRef.current.checked);
    }
  };
  return (
    <div className="w-full h-full fixed top-0 right-0 z-[9999]">
      <div className="drawer drawer-end ">
        <input ref={drawerRef} id="my-drawer-4" onChange={onChangeDrawer} type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <label htmlFor="my-drawer-4" className=" drawer-button btn btn-primary fixed right-0">
            Open drawer
          </label>
        </div>
        {/* 사이드 */}
        <div className="drawer-side  ">
          <label htmlFor="my-drawer-4" className="drawer-overlay" />
          <div className="fiexd z-auto w-1/3 h-screen bg-white flex flex-col justify-center items-center transition ease-in-out ">
            <div className="flex flex-col w-full justify-center items-center h-1/6 border-b-4 ">
              <div className="">
                <img className="mask mask-squircle" src="/baseimage.png" alt="기본이미지" width="64" height="64" />
              </div>
              <div className="mt-3">닉네임</div>
            </div>
            <div className="flex flex-col w-full h-5/6 mt-5 justify-start  items-center">
              <ul className="space-y-10">
                <li>
                  <div className="indicator">
                    <span className="indicator-item badge bg-red-300">99+</span>
                    <label htmlFor="alertmodal" className="btn">
                      알림
                    </label>
                  </div>
                </li>
                {/* 친구목록 */}
                <li>
                  <label htmlFor="my-modal-4" className="">
                    친구목록
                  </label>
                </li>
                {/* 환경설정 */}
                <li>
                  <label htmlFor="my-modal-5" className="">
                    환경설정
                  </label>
                </li>
                <li>
                  <label htmlFor="my-modal-3" className="">
                    로그아웃
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* 로그아웃 모달 */}
        <LogoutModal />
        {/* 친구목록모달 */}
        <FriendModal />
        {/* 환경설정 모달 */}
        <Settingmodal />
        {/* 알림창모달 */}
        <Alertmodal />
      </div>
    </div>
  );
}
