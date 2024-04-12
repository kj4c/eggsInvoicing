const detailTeam = require('../functions/teamDetail');
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
    const res = await detailTeam('hi@gmail.com');
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(res.status).toEqual(400);
  });

  it('success', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{teamid: 2}] });
    pool.query.mockResolvedValueOnce({ rows: [{email: 'hi@gmail.com'}] });
    pool.query.mockResolvedValueOnce({ rows: [{teamid: 2, teamname: 'hi', passcode: 'askjdhasd', teamemail: 'hi@team.com'}] });
    const res = await detailTeam('hi@gmail.com');
    expect(pool.query).toHaveBeenCalledTimes(3);
    expect(res.status).toEqual(200);
  });
});