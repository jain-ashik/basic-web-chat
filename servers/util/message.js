const seconds = new Date().getSeconds();
const hours = new Date().getHours();
const minutes = new Date().getMinutes();
const hours12format = hours > 12 ? 12 - (24 - hours) : hours;
const mode = hours < 12 ? "am" : "pm";
const currentTime = `${hours}:${minutes}:${new Date().getSeconds()} ${mode} `;
// setInterval(
//   () => console.log(`${hours}:${minutes}:${new Date().getSeconds()} ${mode} `),
//   1000
// );

const message = (id, from, text) => {
  return { id, from, text, time: currentTime };
};
//https://google.com/maps/?lat=13.04196712931217&long=77.55256438301184 --geo location url

const geoLocationURL = (lat, long) => {
  return {
    text: "here is my location",
    geoUrl: `https://google.com/maps/?lat=${lat}&long=${long}`,
  };
};

console.log(message(1, "admin", "good morning"));
module.exports = { message, geoLocationURL };
