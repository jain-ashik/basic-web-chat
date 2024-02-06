const {expect} = require("expect");
const { message } = require("./message");

describe("geneate message", () => {
  it("create message object", () => {
    let from = "client 1",
      text = "good morning",
      msg = message(from, text);
    expect(msg.from).toEqual("client 1");
    expect(msg.text).toEqual("good morning");
    expect(msg.from).not.toBe("Client 2");
    expect(msg.text).not.toBe("Good Morning");
    expect(typeof msg.createAt).toBe("number");
    expect(msg).toMatchObject({ from, text });
  });
});
