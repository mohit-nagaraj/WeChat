import { Server } from "socket.io";
import https from "https";
import fs from "fs";
import express from "express";
import { connectDB } from "./dbConfig/connect";
import { User } from "./model/userSchema";

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

// Connect to MongoDB
connectDB();

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  socket.on("addNewUser", async (userId) => {
    console.log("New user", userId);
    const existingUser = await User.findOne({ userId });
    if (!existingUser) {
      const newUser = new User({ userId, socketId: socket.id });
      await newUser.save();
    }
    const onlineUsers = await User.find();
    console.log(onlineUsers);
    io.emit("onlineUsers", onlineUsers);
  });

  socket.on("disconnect", async () => {
    console.log("User disconnected", socket.id);
    await User.deleteOne({ socketId: socket.id });
    const onlineUsers = await User.find();
    io.emit("onlineUsers", onlineUsers);
  });

  socket.on("message", async (data) => {
    const user = await User.findOne({ userId: data.recipientId });
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
