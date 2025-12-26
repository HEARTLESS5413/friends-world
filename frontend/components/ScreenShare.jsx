"use client";
import { useRef } from "react";

export default function ScreenShare() {
  const video = useRef();

  const start = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    });
    video.current.srcObject = stream;
    video.current.play();
  };

  return (
    <>
      <button className="bg-blue-600 px-3 py-1 rounded" onClick={start}>
        Share Screen
      </button>
      <video ref={video} autoPlay playsInline />
    </>
  );
}
