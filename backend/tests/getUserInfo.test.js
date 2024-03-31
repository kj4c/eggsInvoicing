const getUserInfo = require('../functions/getUserInfo');
const pool = require('../database/db');

jest.mock('../database/db', () => ({
  query: jest.fn()
}));

describe('getUserInfo tests', () => {
  let consoleSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should return username, email and phone no of the given uid', async () => {
    const uid = 1;
    pool.query.mockResolvedValueOnce({ rows: [{ uid: 1, username: 'winny', email: 'winnie@gmail.com', phone_no: '0123456789' }] });

    const getUID = await getUserInfo(uid);

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(pool.query).toHaveBeenCalledWith('select username, email, phone_no from users where uid = $1', [uid]);

    expect(getUID).toEqual({ status: 200, username: 'winny', email: 'winnie@gmail.com', phone_no: '0123456789' });
  });

  it('should throw an error if uid entered doesn\'t exist', async () => {
    const uid = 1;
    pool.query.mockResolvedValueOnce({ rows: [] });

    await expect(getUserInfo(uid))
      .rejects
      .toThrow('UID does not exist');

    expect(pool.query).toHaveBeenCalledWith('select username, email, phone_no from users where uid = $1', [uid]);
  });
});