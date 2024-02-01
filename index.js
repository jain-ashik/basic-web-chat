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
  socket.on("disconnect", () => {
    console.log("the existing user has disconnected from the server!!");
  });
});

server.listen(port, () => {
  console.log(`app has started at ${port}`);
});
