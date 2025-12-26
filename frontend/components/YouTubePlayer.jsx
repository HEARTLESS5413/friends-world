"use client";
import { useEffect, useRef } from "react";
import socket from "@/lib/socket";

export default function YouTubePlayer({ roomId, isHost }) {
  const ref = useRef(null);
  const player = useRef(null);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      player.current = new window.YT.Player(ref.current, {
        videoId: "dQw4w9WgXcQ",
        events: {
          onStateChange: e => {
            if (!isHost) return;
            if (e.data === 1) socket.emit("yt-sync", { roomId, action: "play" });
            if (e.data === 2) socket.emit("yt-sync", { roomId, action: "pause" });
          }
        }
      });
    };

    socket.on("yt-sync", d => {
      if (isHost || !player.current) return;
      if (d.action === "play") player.current.playVideo();
      if (d.action === "pause") player.current.pauseVideo();
    });
  }, []);

  return <div ref={ref}></div>;
}
