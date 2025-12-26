"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import YouTubePlayer from "@/components/YouTubePlayer";
import DriveVideoPlayer from "@/components/DriveVideoPlayer";
import ScreenShare from "@/components/ScreenShare";
import VoiceChat from "@/components/VoiceChat";
import ChatBox from "@/components/ChatBox";

export default function Room({ params }) {
  const search = useSearchParams();
  const name = search.get("name");
  const type = search.get("type"); // couple | friends

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Invite link copied ❤️");
  };

  useEffect(() => {
    document.body.className =
      type === "couple" ? "couple-room" : "friends-room";
  }, [type]);

  return (
    <div className="room-page">
      {/* Top Bar */}
      <div className="top-bar">
        <span>
          {type === "couple" ? "💖 Couple Room" : "👥 Friends Room"}
        </span>
        <button onClick={copyLink}>🔗 Share Link</button>
      </div>

      {/* Video Area */}
      <YouTubePlayer roomId={params.id} isHost />

      <DriveVideoPlayer
        roomId={params.id}
        isHost
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />

      {/* Controls */}
      <div className="controls">
        <ScreenShare />
        <VoiceChat />
      </div>

      {/* Chat */}
      <ChatBox nickname={name} />
    </div>
  );
}
