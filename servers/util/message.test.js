const { expect } = require("expect");
const { message, geoLocationURL } = require("./message");

describe("geneate message", () => {
  it("create message object", () => {
    let from = "client 1",
      text = "good morning",
      msg = message(1, from, text);
    expect(msg.from).toEqual("client 1");
    expect(msg.text).toEqual("good morning");
    expect(msg.from).not.toBe("Client 2");
    expect(msg.text).not.toBe("Good Morning");
    expect(typeof msg.time).toBe("string");
    expect(msg).toMatchObject({ from, text });
  });
});

describe("generate location url", () => {
  it("create url location", () => {
    let lat = 13.04196712931217,
      long = 77.55256438301184;
    const url = geoLocationURL(lat, long);
    expect(typeof url.geoUrl).toBe("string");
  });
});
