const request = require('supertest');
const app = require('../app');

jest.mock('../functions/sendingEmailFunction', () => jest.fn().mockResolvedValue({ messageId: '1' }));

describe('/send/email route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should handle the email sending process correctly', async () => {
    const mockEmailData = {
      from: 'jackson@gmail.com',
      recipient: 'kahowang3659@gmail.com',
      xmlString: '<xml>yooo yooo yooo</xml>',
    };

    const response = await request(app)
      .post('/send/email')
      .send(mockEmailData);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.invoiceId).toEqual({messageId: '1'});
  });

  it('should throw an error if sending the email fails', async () => {
    const sendEmailWithXML = require('../functions/sendingEmailFunction');
    sendEmailWithXML.mockRejectedValueOnce(new Error('Failed to send email'));

    const mockEmailData = {
      from: 'jackson@gmail.com',
      recipient: 'kahowang3659@gmail.com',
      xmlString: '<xml>yooo yooo yooo</xml>',
    };

    const response = await request(app)
      .post('/send/email')
      .send(mockEmailData);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Failed to send email');
  });

});

