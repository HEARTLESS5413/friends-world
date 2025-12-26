"use client";
import { useEffect, useState } from "react";
import socket from "@/lib/socket";
import { useSearchParams } from "next/navigation";

import YouTubePlayer from "@/components/YouTubePlayer";
import DriveVideoPlayer from "@/components/DriveVideoPlayer";
import ScreenShare from "@/components/ScreenShare";
import VoiceChat from "@/components/VoiceChat";
import ChatBox from "@/components/ChatBox";
import FloatingMessages from "@/components/FloatingMessages";
import PauseMusic from "@/components/PauseMusic";

export default function Room({ params }) {
  const search = useSearchParams();
  const name = search.get("name");

  const [paused, setPaused] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    socket.emit("join-room", {
      roomId: params.id,
      nickname: name
    });

    socket.on("resume-state", (state) => {
      console.log("Resumed state:", state);
    });

    socket.on("host-changed", (hostId) => {
      setIsHost(socket.id === hostId);
    });

    socket.on("auto-pause", () => setPaused(true));
    socket.on("room-full", () =>
      alert("This is a couple-only room ❤️")
    );
  }, []);

  return (
    <div className="p-4">
      {/* Romantic Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-semibold">💖 Movie Date Mode 💖</h1>
        <p className="text-pink-300 text-sm">
          Just you & your favorite person
        </p>
      </div>

      <div className="relative mb-4">
        <YouTubePlayer roomId={params.id} isHost={isHost} />
        <FloatingMessages />
      </div>

      <DriveVideoPlayer
        roomId={params.id}
        isHost={isHost}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />

      <div className="my-4">
        <ScreenShare />
        <VoiceChat />
      </div>

      <ChatBox nickname={name} />
      <PauseMusic paused={paused} />
    </div>
  );
}
