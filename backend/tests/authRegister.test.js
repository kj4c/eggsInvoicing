const authRegister = require("../functions/authRegister"); 
const pool = require("../database/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

jest.mock("../database/db", () => ({
  query: jest.fn()
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn()
}));

const registerUser = {
  email: "winnie@example.com",
  phone_no: "1234567890",
  username: "winnie",
  password: "password"
}

describe("authRegister", () => {
  let consoleSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should register a new user if all data is not already in use", async () => {
    const { email, phone_no, username, password } = registerUser;

    pool.query.mockResolvedValueOnce({ rows: [] });
    pool.query.mockResolvedValueOnce({ rows: [] });
    pool.query.mockResolvedValueOnce({ rows: [] });
    bcrypt.hash.mockResolvedValueOnce("hashed");

    await authRegister(email, phone_no, username, password);

    expect(pool.query).toHaveBeenCalledTimes(4);
    expect(pool.query).toHaveBeenCalledWith("select * from users where email = $1", [email]);
    expect(pool.query).toHaveBeenCalledWith("select * from users where phone_no = $1", [phone_no]);
    expect(pool.query).toHaveBeenCalledWith("select * from users where username = $1", [username]);

    expect(bcrypt.hash).toHaveBeenCalledWith(password, saltRounds);

    expect(pool.query).toHaveBeenCalledWith("INSERT INTO users (email, phone_no, username, hashed_password) VALUES ($1, $2, $3, $4) RETURNING *", [email, phone_no, username, "hashed"]);
  });

  it("should throw an error if the email is already in use", async () => {
    const { email, phone_no, username, password } = registerUser;
		
    pool.query.mockResolvedValueOnce({ rows: [{ uid: 1, email: email}] }); 

    await expect(authRegister(email, phone_no, username, password))
      .rejects
      .toThrow("Email entered already in use.");

    expect(pool.query).toHaveBeenCalledWith("select * from users where email = $1", [email]);
  });

  it("should throw an error if the phone_no is already in use", async () => {
    const { email, phone_no, username, password } = registerUser;

    pool.query.mockResolvedValueOnce({ rows: [] });
    pool.query.mockResolvedValueOnce({ rows: [{ phone_no: phone_no}] }); 

    await expect(authRegister(email, phone_no, username, password))
      .rejects
      .toThrow("Phone number entered already in use.");

    expect(pool.query).toHaveBeenCalledWith("select * from users where phone_no = $1", [phone_no]);
  });

  it("should throw an error if the username is already in use", async () => {
    const { email, phone_no, username, password } = registerUser;

    pool.query.mockResolvedValueOnce({ rows: [] });
    pool.query.mockResolvedValueOnce({ rows: [] });
    pool.query.mockResolvedValueOnce({ rows: [{ uid: 1, username: username }] }); 

    await expect(authRegister(email, phone_no, username, password))
      .rejects
      .toThrow("Username entered already in use");

    expect(pool.query).toHaveBeenCalledWith("select * from users where username = $1", [username]);
  });
});
