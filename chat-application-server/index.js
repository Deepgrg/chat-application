const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const { router } = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  // A new user logged in
  socket.on("login", ({ username }) => {
    console.log(`User: ${username} has connected`);
  });

  // A new user connected to a room
  socket.on("joinRoom", ({ username, room }) => {
    const { error, user } = addUser(socket.id, username, room);

    if (error) {
      console.log(`Cannot add the user: ${error}`);
      return;
    }

    socket.broadcast.to(user.room).emit("message", {
      username: "admin",
      text: `${user.username} has joined ${user.room} room`,
    });

    console.log(`${user.username} has joined ${user.room} room`);
    socket.join(user.room);

    //
  });

  // A user sends message to the room he joined
  socket.on("chatMessage", ({ message }) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", {
      username: user.username,
      text: message,
    });

    console.log(`${user.username} sent message: ${message}`);
  });

  // A user leaves the room he joined
  socket.on("leaveRoom", () => {
    const user = getUser(socket.id);

    socket.leave(user.room);
    socket.broadcast.to(user.room).emit("message", {
      username: "admin",
      text: `${user.username} has left the room`,
    });
    removeUser(user.id);

    console.log(`${user.username} has left the room ${user.room}`);
  });

  // User disconnected
  socket.on("disconnect", (reason) => {
    console.log(`User disconnected. Reason: ${reason}`);
  });
});

app.use(router);

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`
  -----------------------------------
  Server on: http://localhost:${PORT}
  -----------------------------------
  `);
});
