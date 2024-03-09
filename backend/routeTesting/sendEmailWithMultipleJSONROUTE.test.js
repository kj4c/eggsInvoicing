const request = require('supertest');
const app = require('../app'); 

jest.mock('../functions/sendEmailWithMultipleJSON', () => jest.fn().mockResolvedValue([1, 2])); 

describe('/send/multiDocument route', () => {
  it('should send an email with multiple JSON files attached', async () => {
    const mockEmailData = {
      from: 'Test Sender',
      recipient: 'kahowang3659@gmail.com',
      jsonFiles: [
        {
          jsonString: `{"note": {"to": "Tove", "from": "Jani", "heading": "Reminder", "body": "Don't forget me this weekend!"}}`,
          filename: 'note.json'
        },
        {
          jsonString: `{"invoice": {"to": "Client", "from": "Service Provider", "due": "30 days", "amount": 100.00}}`,
          filename: 'invoice.json'
        }
      ]
    };

    const response = await request(app)
      .post('/send/multiInvoice-json')
      .send(mockEmailData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      invoiceIds: expect.any(Array)
    });
  });
});

describe('/send/multiDocument route error handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should return an error response if sending fails', async () => {
    const sendEmailWithMultipleJSON = require('../functions/sendEmailWIthMultipleJSON');
    sendEmailWithMultipleJSON.mockRejectedValueOnce(new Error('Sending failed'));

    const mockEmailData = {
      from: 'Test Sender',
      recipient: 'kahowang3659@gmail.com',
      jsonFiles: [
        {
          jsonString: `{"note": {"to": "Tove", "from": "Jani", "heading": "Reminder", "body": "Don't forget me this weekend!"}}`,
          filename: 'note.json'
        },
        {
          jsonString: `{"invoice": {"to": "Client", "from": "Service Provider", "due": "30 days", "amount": 100.00}}`,
          filename: 'invoice.json'
        }
      ]
    };

    const response = await request(app)
      .post('/send/multiInvoice-json')
      .send(mockEmailData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: 'Failed to send email.'
    });
  });
});
