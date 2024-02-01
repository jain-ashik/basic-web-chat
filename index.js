const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "public");
const port = process.env.PORT || 3000;
let app = express();

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("a new user has connected to your server!!!");

  socket.broadcast.emit('newUser',{
    from:'Admin',
    text:'a new user has joined',
    id:socket.id
  })
  socket.emit('newUser',{
    from:'Admin',
    text:'welcome to the group'
  })

  

  socket.on("createMessage", (message) => {
    console.log(message);
    io.emit("userMessage", {
      id: socket.id,
      from: message.from,
      text: message.text,
      time: new Date().getHours(),
    });
  });

  socket.emit("fromServer", {
    from: "server",
    text: "two way communictation.",
  });

  socket.on("disconnect", () => {
    console.log("the existing user has disconnected from the server!!");
    socket.broadcast.emit('newUserLeft',{
      from:'Admin',
      text:'existing user has left',
      id:socket.id
    })
  });
});

server.listen(port, () => {
  console.log(`app has started at ${port}`);
});
