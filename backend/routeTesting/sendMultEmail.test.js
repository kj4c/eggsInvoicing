const request = require('supertest');
const app = require('../app'); // Adjust the path as needed

// Assuming sendMultEmail is exported from a specific module, mock that module
const sendMultEmail = require('../functions/sendMultEmail'); // Adjust the path as needed
const { expect } = require('@jest/globals');
jest.mock('../functions/sendMultEmail');

describe('/send/multEmail route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});

  });

  it('successfully sends multiple emails', async () => {
    sendMultEmail.mockResolvedValue();

    const mockInvoiceData = {
      type: 'json',
      from: 'jackson@gmail.com',
      recipients: ['kj@gmail.com','winston@gmail.com','kahowang3659@gmail.com'],
      content: '<xml>swag</xml>'
    };

    const response = await request(app)
      .post('/send/multEmail')
      .send(mockInvoiceData);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    // expect(response.body.invoiceIds).toStrictEqual([1,2,3]);
    console.log('cat', response.body);
  });

  it('should return a 400 error if missing required parameters', async () => {

    const mockIncompleteData = {
      from: 'jackson@gmail.com',
      recipients: 'kahowang3659@gmail.com',
    };

    const response = await request(app)
      .post('/send/multEmail')
      .send(mockIncompleteData);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Missing required parameters');
  });

  it('should return a 401 error if recipients is not an array', async () => {

    const mockBadData = {
      type: 'json',
      from: 'kay',
      recipients: 'key',
      content: '{"message":"yooo yooo yooo"}'
    };

    const response = await request(app)
      .post('/send/multEmail')
      .send(mockBadData);
    
    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Recipients must be an array');
  });

  it('should handle internal errors correctly', async () => {
    sendMultEmail.mockRejectedValueOnce(new Error('Internal server error'));

    const mockInvoiceData = {
      type: 'json',
      from: 'jackson@gmail.com',
      recipients: ['kahowang3659@gmail.com','kj@gmail.com'],
      content: '{"message":"Internal server error test"}',
    };

    const response = await request(app)
      .post('/send/multEmail')
      .send(mockInvoiceData);

    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Internal server error');
  });
});

