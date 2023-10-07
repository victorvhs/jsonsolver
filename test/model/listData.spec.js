const { selectAll } = require("../../src/model/listData");

const db = require("../../src/model/db");
jest.mock("../../src/model/db");

describe("selectAll", () => {
  it("should return an array of objects", async () => {
    const mockRows = [
      { id: 1, name: "Plant 1" },
      { id: 2, name: "Plant 2" },
    ];
    db.all.mockImplementation((query, callback) => {
      callback(null, mockRows);
    });
    const result = await selectAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(mockRows.length);
    expect(result[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
      })
    );
  });

  it("should reject with an error if the database query fails", async () => {
    const mockError = new Error("Database error");
    db.all.mockImplementation((query, callback) => {
      callback(mockError, null);
    });
    await expect(selectAll()).rejects.toThrow(mockError);
  });
});
