"use client";
import { useRef, useEffect } from "react";

export default function PauseMusic({ paused }) {
  const audio = useRef();

  useEffect(() => {
    if (paused) audio.current.play();
    else audio.current.pause();
  }, [paused]);

  return (
    <audio
      ref={audio}
      loop
      src="https://cdn.pixabay.com/download/audio/2022/10/30/audio_89d9c.mp3"
    />
  );
}
