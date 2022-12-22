import React, { useEffect, useRef, useState } from 'react';

interface Props {
  nickname: string;
  stream: MediaStream;
  muted?: boolean;
}

function Video({ nickname, stream, muted }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
    if (muted) setIsMuted(muted);
  }, [stream, muted]);

  return (
    <div className="relative inline-block w-[100px] h-[120px] m-[5px]">
      <div className="flex items-center justify-center bg-cover bg-woody_rounded_button h-28 w-28 rounded-xl">
        <div className="w-20 h-20 bg-cover rounded-full bg-cuckoo_character" />
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        {/* <video ref={ref} muted={isMuted} autoPlay /> */}
      </div>

      <p className="inline-block absolute top-0 left-0"> {nickname}</p>
    </div>
  );
}

export default Video;
