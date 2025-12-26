"use client";
import { useState, useEffect } from "react";
import socket from "@/lib/socket";

export default function ChatBox({ nickname }) {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat-message", (d) =>
      setMessages((prev) => [...prev, d])
    );
  }, []);

  const send = () => {
    if (!msg) return;
    socket.emit("chat-message", msg);
    setMsg("");
  };

  return (
    <div className="bg-pink-900/20 p-3 rounded-xl w-80">
      {messages.map((m, i) => (
        <p
          key={i}
          className="bg-pink-900/40 rounded-xl px-3 py-1 my-1"
        >
          <b className="text-pink-300">{m.nickname}</b>: {m.message}
        </p>
      ))}

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        className="text-black p-1 w-full mt-2 rounded"
        placeholder="Say something sweet…"
      />
      <button onClick={send} className="w-full mt-2">
        Send ❤️
      </button>
    </div>
  );
}
