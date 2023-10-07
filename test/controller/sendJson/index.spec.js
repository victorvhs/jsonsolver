const sendJson = require("../../../src/controller/sendJson");

describe("sendJson", () => {
  it("should return a JSON string", async () => {
    const req = {};
    const res = {
      send: jest.fn(),
    };
    await sendJson(req, res);
    expect(res.send).toHaveBeenCalledWith(expect.any(String));
    expect(() => JSON.parse(res.send.mock.calls[0][0])).not.toThrow();
  });
});
