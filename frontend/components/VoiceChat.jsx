"use client";
import socket from "@/lib/socket";
import { useRef } from "react";

export default function VoiceChat() {
  const pc = useRef(null);

  const start = async () => {
    pc.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(t => pc.current.addTrack(t, stream));

    pc.current.onicecandidate = e => {
      if (e.candidate) socket.emit("webrtc-ice", e.candidate);
    };

    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);
    socket.emit("webrtc-offer", offer);
  };

  socket.on("webrtc-offer", async offer => {
    pc.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(t => pc.current.addTrack(t, stream));

    await pc.current.setRemoteDescription(offer);
    const answer = await pc.current.createAnswer();
    await pc.current.setLocalDescription(answer);
    socket.emit("webrtc-answer", answer);
  });

  socket.on("webrtc-answer", answer => {
    pc.current.setRemoteDescription(answer);
  });

  socket.on("webrtc-ice", ice => {
    pc.current.addIceCandidate(ice);
  });

  return (
    <button className="bg-green-600 px-3 py-1 rounded ml-2" onClick={start}>
      Mic On
    </button>
  );
}
