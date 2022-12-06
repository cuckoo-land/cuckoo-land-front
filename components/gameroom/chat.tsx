import Input from '@components/input';
import React from 'react';

function Chat() {
  return (
    <div className="flex items-center justify-center h-48 mt-2">
      <div className="w-10/12 h-full bg-white rounded-2xl">
        <div className="">
          <div className="flex items-center justify-center gap-2 p-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full shadow-lg" />
            <div className="w-4/5 h-10 bg-gray-200 shadow-lg" />
          </div>
          <div className="flex items-center justify-center gap-2 p-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full shadow-lg" />
            <div className="w-4/5 h-10 bg-gray-200 shadow-lg" />
          </div>
          <div className="flex items-center justify-center gap-2 p-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full shadow-lg" />
            <div className="w-4/5 h-10 bg-gray-200 shadow-lg" />
          </div>
        </div>
        <form className="text-center bottom">
          <button type="button" className="w-10 h-5 bg-gray-200">
            전송
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
