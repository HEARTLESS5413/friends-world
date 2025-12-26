"use client";
import { useEffect, useState } from "react";
import socket from "@/lib/socket";

export default function FloatingMessages() {
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    socket.on("chat-message", d => {
      setMsgs(prev => [...prev, d]);
      setTimeout(() => setMsgs(prev => prev.slice(1)), 4000);
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {msgs.map((m, i) => (
        <div key={i} className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 rounded">
          {m.nickname}: {m.message}
        </div>
      ))}
    </div>
  );
}
