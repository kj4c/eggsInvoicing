const authLogin = require("../functions/authLogin"); 
const pool = require("../database/db");
const bcrypt = require("bcrypt");

jest.mock("../database/db", () => ({
  query: jest.fn()
}));
  
jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValueOnce("hashed")
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn()
}));

const loginUser = {
  username: "winnie",
  password: "password"
}

describe("authLogin", () => {
  let consoleSpy;
  
  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });
  
  afterEach(() => {
    consoleSpy.mockRestore();
  });
  
  it("should login user if given username and password are correct", async () => {
    const { username, password } = loginUser;

    pool.query.mockResolvedValueOnce({ rows: [{ uid: 1, username: username, hashed_password: "hashed"}] });
    bcrypt.compare.mockResolvedValueOnce(true);

    const login = await authLogin(username, password);

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(pool.query).toHaveBeenCalledWith("select * from users where username = $1", [username]);

    expect(bcrypt.compare).toHaveBeenCalledWith(password, "hashed");

    expect(login).toEqual({ status: 200, uid: expect.any(Number) });
  });
  
  it("should throw an error if username entered doesn't exist", async () => {
    const { username, password } = loginUser;
				
    pool.query.mockResolvedValueOnce({ rows: [] }); 

    await expect(authLogin(username, password))
      .rejects
      .toThrow("Username does not exist");

    expect(pool.query).toHaveBeenCalledWith("select * from users where username = $1", [username]);
  });
  
  it("should throw an error if the password is incorrect", async () => {
    const { username, password } = loginUser;

    bcrypt.hash;
    pool.query.mockResolvedValueOnce({ rows: [{ username: username, hashed_password: password}] }); 
    bcrypt.compare.mockResolvedValueOnce(false);

    await expect(authLogin(username, "wrongpassword"))
      .rejects
      .toThrow("Password is incorrect");

    expect(pool.query).toHaveBeenCalledWith("select * from users where username = $1", [username]);
    expect(bcrypt.compare).toHaveBeenCalledWith("wrongpassword", password);
  });
});
  