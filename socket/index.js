import fs from 'fs';
import https from 'https';
import { Server } from "socket.io";
import express from 'express';

const app = express();

// Load SSL certificate and key
const privateKey = fs.readFileSync('ssl/server.key', 'utf8');
const certificate = fs.readFileSync('ssl/server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

// Initialize Socket.io with the HTTPS server
const io = new Server(httpsServer, {
  cors: {
    origin: "https://we-chat-rho.vercel.app/",
    methods: ["GET", "POST"],
    credentials: true, // If you need to send cookies or authorization headers
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  socket.on("addNewUser", (userId) => {
    console.log("New user", userId);
    if (!onlineUsers.find((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
    }
    console.log(onlineUsers);
    io.emit("onlineUsers", onlineUsers);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("onlineUsers", onlineUsers);
  });

  socket.on("message", (data) => {
    const user = onlineUsers.find((user) => user.userId === data.recipientId);
    console.log("sending message", data, "to", user.socketId);
    if (user && user.socketId) {
      io.to(user.socketId).emit("message", data);
    }
  });
});

// Start the HTTPS server on port 3000
httpsServer.listen(3000, () => {
  console.log("HTTPS socket Server running on port 3000");
});
