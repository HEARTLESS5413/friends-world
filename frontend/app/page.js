"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState("home");
  const [name, setName] = useState("");

  const createRoom = (type) => {
    const id = Math.random().toString(36).slice(2, 8);
    router.push(`/room/${id}?name=${name}&type=${type}`);
  };

  return (
    <main className="home">
      <h1>FriendsWorld 🎬</h1>

      {step === "home" && (
        <>
          <input
            placeholder="Your nickname"
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={() => setStep("choose")}>
            Make a Room
          </button>
        </>
      )}

      {step === "choose" && (
        <div className="room-options">
          <button className="couple" onClick={() => createRoom("couple")}>
            💖 Couple Room
          </button>
          <button className="friends" onClick={() => createRoom("friends")}>
            👥 Friends Room
          </button>
        </div>
      )}
    </main>
  );
}
