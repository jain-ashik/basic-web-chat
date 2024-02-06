const message = (id, from, text) => {
  return { id, from, text, time: new Date().getHours() };
};
//https://google.com/maps/?lat=13.04196712931217&long=77.55256438301184

const geoLocationURL = (lat, long) => {
  return {
    text: "here is my location",
    geoUrl: `https://google.com/maps/?lat=${lat}&long=${long}`,
  };
};
module.exports = { message,geoLocationURL };
