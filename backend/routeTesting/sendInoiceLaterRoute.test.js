const request = require('supertest');
const app = require('../app'); // Adjust the path as needed

// Assuming sendInvoiceLater is exported from a specific module, mock that module
const sendInvoiceLater = require('../functions/sendingInoiceLater'); // Adjust the path as needed
jest.mock('../functions/sendingInoiceLater');

describe('/send/invoiceLater route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should schedule an invoice to be sent later successfully', async () => {
    sendInvoiceLater.mockResolvedValue();

    const mockInvoiceData = {
      type: 'json',
      from: 'jackson@gmail.com',
      recipient: 'kahowang3659@gmail.com',
      content: '{"message":"yooo yooo yooo"}',
      delayInMinutes: 1
    };

    const response = await request(app)
      .post('/send/invoiceLater')
      .send(mockInvoiceData);

    expect(response.statusCode).toBe(202);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(`Invoice scheduled to be sent after ${mockInvoiceData.delayInMinutes} minute(s)`);
  });

  it('should return a 400 error if missing required parameters', async () => {

    const mockIncompleteData = {
      from: 'jackson@gmail.com',
      recipient: 'kahowang3659@gmail.com',
    };

    const response = await request(app)
      .post('/send/invoiceLater')
      .send(mockIncompleteData);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Missing required parameters');
  });

  it('should handle internal errors correctly', async () => {
    sendInvoiceLater.mockRejectedValueOnce(new Error('Internal server error'));

    const mockInvoiceData = {
      type: 'json',
      from: 'jackson@gmail.com',
      recipient: 'kahowang3659@gmail.com',
      content: '{"message":"Internal server error test"}',
      delayInMinutes: 1
    };

    const response = await request(app)
      .post('/send/invoiceLater')
      .send(mockInvoiceData);

    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Internal server error');
  });
});

describe('/send/invoiceLater route', () => {
  // Assuming sendInvoiceLater is mocked at the top of your test file as shown previously

  it('should handle internal errors correctly', async () => {
    sendInvoiceLater.mockRejectedValueOnce(new Error('Internal server error'));

    const mockInvoiceData = {
      type: 'json',
      from: 'jackson@gmail.com',
      recipient: 'kahowang3659@gmail.com',
      content: '{"message":"Internal server error test"}',
      delayInMinutes: 1
    };

    const response = await request(app)
      .post('/send/invoiceLater')
      .send(mockInvoiceData);

    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Internal server error');
  });
});
