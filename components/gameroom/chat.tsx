import Button from '@components/button';
import Input from '@components/input';
import React from 'react';

function Chat({ handleSendMSG, messageRef, chatList }) {
  return (
    <div className="flex items-center justify-center h-48 mt-2">
      <div className="w-10/12 h-full bg-cover bg-woody_banner rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2 p-2">
          {chatList &&
            chatList.map((chat) => (
              <>
                <div className="flex items-center justify-center w-full gap-2">
                  <div className="w-10 h-10 bg-cover rounded-full shadow-lg bg-cuckoo_character" />
                  <div className="flex items-center justify-center w-4/5 h-10 font-bold bg-white rounded-full shadow-lg">
                    {chat.message}
                  </div>
                </div>
              </>
            ))}
          {/* Return Chat */}
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div>
              <Button
                texture="white"
                text="전송"
                type="button"
                className="w-10 h-5 bg-gray-200"
                onClick={handleSendMSG}
              />
            </div>
            {/* <Input register={messageRef} /> */}
            <input ref={messageRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
