const { expect } = require("@jest/globals");
const pool = require("../database/db");
const getNotifications = require("../functions/getNotifications");

jest.mock("../database/db", () => ({
  query: jest.fn()
}));

describe("Test suite for /receive/getNotifications", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return no notifications found for users with no notifications", async () => {
    const uId = 999;
    const q = "select notifications from users where uid = $1";
    pool.query.mockResolvedValueOnce({ rows: [] });
    const res = await getNotifications(uId);
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(res).toEqual({message: "No new notifications"});
    expect(pool.query).toHaveBeenCalledWith(q,[uId]);
  });

  it("Should return a list of notifications if user has notifications", async () => {
    const uId = 999;
    const q1 = "select notifications from users where uid = $1";
    const q2 = "update users set notifications = '{}' where uid = $1"
    pool.query.mockResolvedValueOnce({ rows: [ { notifications: [] } ] });
    const res = await getNotifications(uId);
    expect(pool.query).toHaveBeenCalledTimes(2);
    expect(pool.query).toHaveBeenCalledWith(q1,[uId]);
    expect(pool.query).toHaveBeenCalledWith(q2,[uId]);
    expect(res).toEqual({notifications: expect.any(Array)});
  });
});