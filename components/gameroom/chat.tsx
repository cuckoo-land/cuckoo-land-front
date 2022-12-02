import React from 'react';

function Chat() {
  return (
    <div className="flex items-center justify-center h-48 mt-2">
      <div className="w-10/12 h-full bg-white rounded-2xl">
        <div className="flex items-center justify-center gap-2 p-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full shadow-lg" />
          <div className="w-4/5 h-10 bg-gray-200 shadow-lg" />
        </div>
        <form className="bottom">
          <button type="button" className="w-10 h-5 bg-gray-200" />
          전송
          <input type="text" className="border-2 border-black" placeholder="hi" />
        </form>
      </div>
    </div>
  );
}

export default Chat;
