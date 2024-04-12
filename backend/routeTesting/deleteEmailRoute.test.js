const request = require('supertest');
const app = require('../app');

jest.mock('../functions/deleteEmail', () => jest.fn().mockImplementation((invoiceId) => {
  if (invoiceId === 123) {
    return Promise.resolve({
      status: 200,
    });
  } else {
    return Promise.reject(new Error('Invoice ID not found'));
  }
}));

describe('/deleteEmail route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should handle invoice deletion correctly', async () => {
    const response = await request(app)
      .delete('/deleteEmail/123');
    expect(response.statusCode).toBe(200);
  });

  // testing with incorrect credentials
  it('should throw an error if deletion fails', async () => {
    const responseForBadRequest = await request(app)
      .delete('/deleteEmail/456');

    expect(responseForBadRequest.statusCode).toBe(404);
    expect(responseForBadRequest.body).toEqual({ message: 'Invoice ID not found' });
  });
});