import type {} from 'next/';
import React, { useRef, useState } from 'react';
// import { cls } from '@utils/cls';
import { cls } from '@utils/cls';
import { FriendModal } from './menumodal/Friendmodal';
import { LogoutModal } from './menumodal/Logoutmodal';
import { Settingmodal } from './menumodal/Settingmodal';
import { Alertmodal } from './menumodal/Alertmodal';

interface IProps {
  setMenu: (a: boolean) => void;
  openMenu: boolean;
}
export default function Menubar(props: IProps) {
  return (
    <>
      <button
        type="button"
        className={cls('w-full h-full fixed bg-black opacity-50 ', props.openMenu ? '-z-10' : 'z-20')}
        onClick={() => {
          props.setMenu(!props.openMenu);
        }}
      />
      <div
        className={cls(
          `fixed top-0  z-20 w-1/3 h-screen bg-white_modal bg-no-repeat bg-cover flex flex-col justify-center items-center pt-5 pl-5 `,
          props.openMenu ? '-right-1/3  ' : 'right-0 animate-menu_apper'
        )}>
        <div className="flex flex-col w-full justify-center items-center h-1/6 border-b-4 ">
          <div className="">
            <img className="mask mask-squircle" src="/baseimage.png" alt="기본이미지" width="64" height="64" />
          </div>
          <div className="mt-3">닉네임</div>
        </div>
        <div className="flex flex-col w-full h-5/6 mt-5 justify-start  items-center">
          <ul className="space-y-10">
            <li>
              <div className="indicator ">
                <span className="indicator-item text-red-900 badge bg-white_banner bg-no-repeat bg-cover">99+</span>
                <label htmlFor="alertmodal" className="btn bg-woody_banner bg-cover">
                  알림
                </label>
              </div>
            </li>
            {/* 친구목록 */}
            <li>
              <label htmlFor="my-modal-4" className="btn  bg-woody_banner bg-cover bg-no-repeat">
                친구목록
              </label>
            </li>
            {/* 환경설정 */}
            <li>
              <label htmlFor="my-modal-5" className="btn bg-woody_banner bg-cover bg-no-repeat">
                환경설정
              </label>
            </li>
            <li>
              <label htmlFor="my-modal-3" className="btn  bg-woody_banner bg-cover bg-no-repeat">
                로그아웃
              </label>
            </li>
          </ul>
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
    </>
  );
}
