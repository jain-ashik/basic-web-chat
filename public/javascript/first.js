const socket = io();
socket.on("connect", () => {
  console.log("you have connected to the server!!!");
});
socket.on("userMessage", (message) => {
  console.log(message);
});
socket.on("disconnect", () => {
  console.log("The server connection has lost!!!");
});
socket.on('newUser',(message)=>{
  console.log(message);
})

socket.on('newUserLeft',(message)=>{
  console.log(message);
})