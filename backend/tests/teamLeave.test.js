const leaveTeam = require('../functions/teamLeave');
const pool = require('../database/db');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

describe('team detail tests', () => {
  let consoleSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('email is not in a team', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    const res = await leaveTeam('hi@gmail.com');
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(res.status).toEqual(400);
  });

  it('success', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{email: 'hi@gmail.com', teamid: 1}] });
    pool.query.mockResolvedValueOnce({});
    pool.query.mockResolvedValueOnce({ rows: [] });
    pool.query.mockResolvedValueOnce({});
    const res = await leaveTeam('hi@gmail.com');
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM members WHERE email = $1', ['hi@gmail.com']);
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM members WHERE email = $1', ['hi@gmail.com']);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM members WHERE teamId = $1', [1]);
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM teams WHERE teamId = $1', [1]);
    expect(pool.query).toHaveBeenCalledTimes(4);
    expect(res.status).toEqual(200);
  });

  it('success with members left', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{email: 'hi@gmail.com', teamid: 1}, {email: 'hi2@gmail.com', teamid: 1}] });
    pool.query.mockResolvedValueOnce({});
    pool.query.mockResolvedValueOnce({ rows: [{email: 'hi2@gmail.com', teamid: 1}] });
    const res = await leaveTeam('hi@gmail.com');
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM members WHERE email = $1', ['hi@gmail.com']);
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM members WHERE email = $1', ['hi@gmail.com']);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM members WHERE teamId = $1', [1]);
    expect(pool.query).toHaveBeenCalledTimes(3);
    expect(res.status).toEqual(200);
  });
});