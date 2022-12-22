import Button from '@components/button';
import Input from '@components/input';
import React from 'react';

function Chat() {
  return (
    <div className="flex items-center justify-center h-48 mt-2">
      <div className="w-10/12 h-full bg-cover bg-woody_banner rounded-2xl">
        <div className="flex items-center justify-center gap-2 p-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full shadow-lg" />
          <div className="w-4/5 h-10 bg-gray-200 shadow-lg" />
        </div>
        <form className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div>
              <Button texture="white" text="전송" type="submit" className="w-10 h-5 bg-gray-200" />
            </div>
            {/* <Input /> */}
            <Input type="text" placeholder="메세지" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
