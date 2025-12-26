"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  const createRoom = () => {
    const id = Math.random().toString(36).slice(2, 8);
    router.push(`/room/${id}?name=${name}`);
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-4">FriendsWorld 🎬</h1>
      <input
        className="p-2 text-black mb-3"
        placeholder="Your nickname"
        onChange={e => setName(e.target.value)}
      />
      <button className="bg-red-600 px-6 py-2 rounded" onClick={createRoom}>
        Create Room
      </button>
    </main>
  );
}
