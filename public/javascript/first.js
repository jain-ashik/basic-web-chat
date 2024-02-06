const socket = io();
socket.on("connect", () => {
  console.log("you have connected to the server!!!");
});

document.querySelector("#submit-btn").addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: "user1",
      text: document.querySelector("#userMessage").value,
    },
    () => {}
  );
});

document.querySelector("#location-btn").addEventListener("click", (e) => {
  e.preventDefault();
  if (!navigator.geolocation) {
    return alert("geolocation is not in your browser");
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      socket.emit("userLocation", {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    },
    (error) => console.error(error)
  );
});

socket.on("userMessage", (message) => {
  console.log(message);
  const li = document.createElement("li");
  li.innerText = `${message.from}-${message.text}`;
  document.querySelector("body").appendChild(li);
});
socket.on("disconnect", () => {
  console.log("The server connection has lost!!!");
});
socket.on("newUser", (message) => {
  console.log(message);
});

socket.on("newUserLeft", (message) => {
  console.log(message);
  const li = document.createElement("li");
  li.innerText = "the existing user has left the group";
  document.querySelector("body").appendChild(li);
});
// socket.emit("createMessage", { from: "client", text: "good morning" }, () =>
//   console.log("server has got the message")
// );

socket.on("locationDetails", (locationDetails) => {
  const text1 = locationDetails.text;
  const url = locationDetails.geoUrl;
  const li = document.createElement("li");
  const a_tag = document.createElement("a");
  a_tag.setAttribute("target", "_blank");
  a_tag.setAttribute("href", url);
  a_tag.innerText = "user1::my location";
  li.appendChild(a_tag);
  document.querySelector("body").appendChild(li);
});
