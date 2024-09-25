import { Server } from "socket.io";
import https from "https";
import fs from "fs";
import express from "express";

// Initialize an express app
const app = express();

// SSL certificates
const sslOptions = {
  key: fs.readFileSync("/ssl/server.key"),
  cert: fs.readFileSync("/ssl/server.cert"),
};

// Create an HTTPS server
const httpsServer = https.createServer(sslOptions, app);

// Initialize Socket.IO with CORS and attach to the HTTPS server
const io = new Server(httpsServer, {
  cors: {
    origin: "https://we-chat-rho.vercel.app/",
    methods: ["GET", "POST"],
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
    console.log("sending message", data, "to", user?.socketId);
    if (user && user.socketId) {
      io.to(user.socketId).emit("message", data);
    }
  });
});

// Start the HTTPS server on port 3000
httpsServer.listen(3000, () => {
  console.log("Server is listening on port 3000 with HTTPS");
});
