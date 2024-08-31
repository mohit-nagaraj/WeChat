import { Server } from "socket.io";

const io = new Server({
  cors: "http://localhost:5173/",
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  socket.on("addNewUser", (userId) => {
    console.log("New user", userId);
    if (!onlineUsers.find((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
    }
    console.log(onlineUsers)
    io.emit("onlineUsers", onlineUsers);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("onlineUsers", onlineUsers);
  });

  socket.on("message", (data) => {
    const user = onlineUsers.find((user) => user.userId === data.recipientId);
    console.log("sending message", data ,"to", user.socketId);
    if (user.socketId) {
      io.to(user.socketId).emit("message", data);
    }
  });
});

io.listen(3000);
