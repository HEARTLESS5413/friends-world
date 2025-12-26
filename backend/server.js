import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const rooms = new Map();

io.on("connection", (socket) => {

  socket.on("join-room", ({ roomId, nickname }) => {
    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        users: [],
        hostId: socket.id,
        videoState: {
          type: "youtube",
          time: 0,
          paused: true
        }
      });
    }

    const room = rooms.get(roomId);

    if (room.users.length >= 2) {
      socket.emit("room-full");
      return;
    }

    room.users.push({ id: socket.id, nickname });

    socket.emit("resume-state", room.videoState);
    socket.emit("host-changed", room.hostId);

    io.to(roomId).emit("users-update", room.users);

    socket.on("sync-state", (state) => {
      room.videoState = state;
    });

    socket.on("yt-sync", data => socket.to(roomId).emit("yt-sync", data));
    socket.on("video-sync", data => socket.to(roomId).emit("video-sync", data));

    socket.on("chat-message", msg => {
      io.to(roomId).emit("chat-message", {
        nickname,
        message: msg,
        time: Date.now()
      });
    });

    socket.on("webrtc-offer", d => socket.to(roomId).emit("webrtc-offer", d));
    socket.on("webrtc-answer", d => socket.to(roomId).emit("webrtc-answer", d));
    socket.on("webrtc-ice", d => socket.to(roomId).emit("webrtc-ice", d));

    socket.on("disconnect", () => {
      room.users = room.users.filter(u => u.id !== socket.id);

      if (room.hostId === socket.id && room.users.length > 0) {
        room.hostId = room.users[0].id;
        io.to(roomId).emit("host-changed", room.hostId);
      }

      io.to(roomId).emit("auto-pause");

      if (room.users.length === 0) {
        rooms.delete(roomId);
      }
    });
  });
});

server.listen(4000, () =>
  console.log("Backend running on port 4000")
);
