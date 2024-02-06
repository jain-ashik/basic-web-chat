const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const { message, geoLocationURL } = require("./servers/util/message");

const publicPath = path.join(__dirname, "public");
const port = process.env.PORT || 3000;
let app = express();

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("a new user has connected to your server!!!");

  socket.broadcast.emit(
    "newUser",
    message(socket.id, "admin", "a new user has joined!")
  );
  socket.emit("newUser", message(socket.id, "admin", "welcome to the group"));

  socket.on("createMessage", (msg, cb) => {
    console.log(msg);
    io.emit("userMessage", message(socket.id, msg.from, msg.text));
    cb();
  });
  socket.emit("userMessage", message(1, "admin", "welcome to the group!"));
  socket.broadcast.emit(
    "userMessage",
    message(socket.id, "admin", "a new user has joined the group! chat safe")
  );
  socket.emit("fromServer", {
    from: "server",
    text: "two way communictation.",
  });
  socket.on("userLocation", (userLocationmessage) => {
    const locationDetails = geoLocationURL(
      userLocationmessage.lat,
      userLocationmessage.long
    );
    console.info(locationDetails);
    io.emit("locationDetails", locationDetails);
  });

  socket.on("disconnect", () => {
    console.log("the existing user has disconnected from the server!!");
    socket.broadcast.emit(
      "newUserLeft",
      message(socket.id, "admin", "the existing user has left!")
    );
  });
});

server.listen(port, () => {
  console.log(`app has started at ${port}`);
});
