const joinTeam = require('../functions/teamJoin');
const pool = require('../database/db');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

describe('team join tests', () => {
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
    const res = await joinTeam("hi", "sdkfjsdjfh");
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(res.status).toEqual(400);
  });

  it('Incorrect passcode', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    pool.query.mockResolvedValueOnce({ rows: [] });
  
    const res = await joinTeam("hi", "askdjadhk");
    expect(pool.query).toHaveBeenCalledTimes(2);
    expect(res.status).toEqual(400);
  
  });

  it('success', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    pool.query.mockResolvedValueOnce({ rows: [{teamid: 2}] });
    const res = await joinTeam("hi", "askdjadhk");
    expect(pool.query).toHaveBeenCalledTimes(3);
    expect(res.status).toEqual(200);
  });
});