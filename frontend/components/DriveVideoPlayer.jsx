"use client";
import { useRef, useEffect } from "react";
import socket from "@/lib/socket";

export default function DriveVideoPlayer({ roomId, isHost, src }) {
  const video = useRef();

  useEffect(() => {
    socket.on("video-sync", d => {
      if (isHost) return;
      if (d.type === "play") video.current.play();
      if (d.type === "pause") video.current.pause();
      if (d.type === "seek") video.current.currentTime = d.time;
    });
  }, []);

  const sync = type => {
    socket.emit("video-sync", {
      roomId,
      type,
      time: video.current.currentTime
    });
  };

  return (
    <video
      ref={video}
      src={src}
      controls
      onPlay={() => sync("play")}
      onPause={() => sync("pause")}
      onSeeked={() => sync("seek")}
    />
  );
}
