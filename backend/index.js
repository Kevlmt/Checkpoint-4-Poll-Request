require("dotenv").config();

// const socket = require("socket.io");
const app = require("./src/app");

const port = parseInt(process.env.APP_PORT ?? "5000", 10);

const server = app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${port}`);
  }
});

// eslint-disable-next-line import/order
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  // global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("disconnect", (userId) => {
    onlineUsers.delete(userId);
  });

  socket.on("send-msg", (message) => {
    const sendUserSocket = onlineUsers.get(message.toId);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", message.fromId);
    }
  });
});

// eslint-disable-next-line import/order
// const io = require("socket.io")(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL.split(",") ?? "http://localhost:3000",
//     optionsSuccessStatus: 200,
//     credentials: true,
//   },
// });

// io.on("connect", (socket) => {
//   console.warn("user connected: ", Object.keys(socket));
//   socket.on("disconnect", () => {
//     console.warn("user disconnected");
//   });

//   socket.emit("initialMessageList", messages);

//   socket.on("messageFromClient", (newMessageWithTextAndAuthor) => {
//     const newMessage = { ...newMessageWithTextAndAuthor };
//     console.warn("New message from client: ", newMessage);
//     messages.push(newMessage);

//     io.emit("updatedMessageList", messages);
//   });
// });
