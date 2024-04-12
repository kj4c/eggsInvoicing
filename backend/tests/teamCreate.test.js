const createTeam = require('../functions/teamCreate');
const pool = require('../database/db');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

describe('team create tests', () => {
  let consoleSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('email is already in a team', async () => {
    const email = "jest@test.com";
    pool.query.mockResolvedValueOnce({ rows: [{ email: email, teamid: 2 }] });
    const res = await createTeam("hi", email, "team@email.com");
    expect(res.status).toEqual(400);
  });

  it('team email is already in a team', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    pool.query.mockResolvedValueOnce({ rows: [{ teamid: 1, teamname: 'hi', passcode: 'aksdjksd', teamEmail: ["hi@email.com"] }] });
  
    const res = await createTeam("hi", "hi@email.com", "hi@team.com");
    expect(pool.query).toHaveBeenCalledTimes(2);
    expect(res.status).toEqual(400);
  
  });

  it('success', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    pool.query.mockResolvedValueOnce({ rows: [] });
    pool.query.mockResolvedValueOnce({ rows: [{teamid: 2}] });
    const res = await createTeam("hi", "ksdf@email.com", "sdfkjd@team.com");
    expect(pool.query).toHaveBeenCalledTimes(4);
    expect(res.status).toEqual(200);
  });
});