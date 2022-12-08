import { useEffect, useRef } from 'react';

let myStream: MediaStream;
let myPeerConnection: RTCPeerConnection;
// let roomName: string;
let muted = false;
let carmeraonoff = false;
export function Devicesettingmodal() {
  const myFace = useRef<HTMLVideoElement>(null);
  const selectVideoRef = useRef<HTMLSelectElement>(null);
  const selectAudioRef = useRef<HTMLSelectElement>(null);
  const audioRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLButtonElement>(null);

  async function getCamera() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === 'videoinput');
      const audios = devices.filter((device) => device.kind === 'audioinput');
      // console.log('사용가능카메라', cameras);
      // const currentCamera = myStream.getVideoTracks()[0];
      if (cameras.length > (selectVideoRef.current?.length ?? false)) {
        cameras.forEach((camera) => {
          const option = document.createElement('option');
          option.value = camera.deviceId;
          option.innerText = camera.label;
          // if (currentCamera.label == camera.label) {
          //   option.selected = true;
          // }

          selectVideoRef.current && selectVideoRef.current.appendChild(option);
        });
      }
      if (audios.length > (selectAudioRef.current?.length ?? false)) {
        audios.forEach((audios) => {
          const option = document.createElement('option');
          option.value = audios.deviceId;
          option.innerText = audios.label;
          // if (currentCamera.label == camera.label) {
          //   option.selected = true;
          // }
          selectAudioRef.current && selectAudioRef.current.appendChild(option);
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('getcamera오류', error);
    }
  }
  useEffect(() => {
    startMedia();
  }, []);
  // 디바이스가 undefinded인데 화상이 나오는 버그 셀렉트 하고 나서야 뮤트되는 버그가 있음
  async function getMedia(deviceId: string) {
    // console.log('첫값아디', deviceId);
    const initialConstrains = { audio: true, video: { facingMode: 'user' } }; // { facingMode: 'user' } 폰버젼 셀카
    const camerConstraints = { audio: true, video: { deviceId: { exact: deviceId } } };
    try {
      myStream = await navigator.mediaDevices.getUserMedia(deviceId ? camerConstraints : initialConstrains);
      // console.log('디바이스아이디', camerConstraints);
      if (myFace.current !== null) {
        myFace.current.srcObject = myStream;
        // console.log('마페', myFace.current.srcObject);
      }
      //   if (!deviceId) {
      getCamera();
      myStream?.getAudioTracks().forEach((track) => {
        track.enabled = false;
      });
      //   }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
  const handleMute = () => {
    // eslint-disable-next-line no-return-assign
    myStream?.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    if (!muted && audioRef.current) {
      audioRef.current.innerText = 'Unmute';
      muted = true;
    } else if (audioRef.current) {
      audioRef.current.innerText = 'Mute';
      muted = false;
    }
  };
  const handleCamera = () => {
    // eslint-disable-next-line no-return-assign
    myStream?.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    if (!carmeraonoff && videoRef.current) {
      videoRef.current.innerText = 'Caemra On';
      carmeraonoff = true;
    } else if (videoRef.current) {
      videoRef.current.innerText = 'Camera Off';
      carmeraonoff = false;
    }
  };
  const handleSelect = async () => {
    // console.log('선택한다바이스아디', selectVideoRef.current?.value);
    if (selectVideoRef.current) {
      await getMedia(selectVideoRef.current.value);
    }

    if (myPeerConnection) {
      const videoTrack = myStream.getVideoTracks()[0];
      const videoSender = myPeerConnection.getSenders().find((sender) => sender.track?.kind === 'video');
      videoSender && videoSender.replaceTrack(videoTrack);
    }
  };

  const handleSelectAudio = async () => {
    // console.log('선택한다바이스아디', selectAudioRef.current?.value);
    if (selectAudioRef.current) {
      await getMedia(selectAudioRef.current.value);
    }
    if (myPeerConnection) {
      const AudioTrack = myStream.getAudioTracks()[0];
      const AudioSender = myPeerConnection.getSenders().find((sender) => sender.track?.kind === 'audio');
      AudioSender && AudioSender.replaceTrack(AudioTrack);
    }
  };

  async function startMedia() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');
    // console.log('처음 카메라', cameras[0].deviceId);

    // setroom(false);
    await getMedia(cameras[0].deviceId);
    makeConnection();
  }

  //   function handleRoomSubmit(evnet: FormEvent) {
  //     evnet.preventDefault();
  //     // roomName = roomRef.current!.value;
  //     startMedia();
  //     // socket.emit('join_room', roomName);
  //   }
  function makeConnection() {
    myPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
            'stun:stun4.l.google.com:19302',
          ],
        },
      ],
    });
    // myPeerConnection.addEventListener('icecandidate', handleIce);
    // myPeerConnection.addEventListener('addstream', handleAddStream);
    if (myStream !== undefined) {
      myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream));
    }
  }

  //   function handleAddStream(data: any) {
  //     console.log('data', data);
  //     // const peersStream = peerStream.current;
  //     // peersStream!.srcObject = data.stream;
  //   }
  //   function handleIce(data: RTCPeerConnectionIceEvent) {
  //     console.log('sent candiate', data);
  //     // socket.emit('ice', data.candidate, roomName);
  //   }

  return (
    <>
      <input type="checkbox" id="device-setting" className="modal-toggle" />
      <label htmlFor="device-setting" className="modal">
        <label htmlFor="" className="modal-box relative min-h-[150px] max-h-[720px]">
          <label htmlFor="device-setting" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <div className="mt-5 w-full flex flex-col space-y-8">
            <video className="mask mask-circle" autoPlay ref={myFace} playsInline>
              <track kind="captions" />
            </video>
            <div className="w-full flex space-x-3 justify-center">
              <button className="btn block" ref={audioRef} type="button" onClick={handleMute}>
                Mute
              </button>
              <button className="btn block" ref={videoRef} type="button" onClick={handleCamera}>
                Camera off
              </button>
            </div>
            <div className="flex flex-col space-y-5">
              <select
                className="select select-bordered select-xs w-full max-w-xs"
                onInput={handleSelect}
                ref={selectVideoRef}
              />
              <select
                className="select select-bordered select-xs w-full max-w-xs"
                onInput={handleSelectAudio}
                ref={selectAudioRef}
              />
            </div>
          </div>
        </label>
      </label>
    </>
  );
}
