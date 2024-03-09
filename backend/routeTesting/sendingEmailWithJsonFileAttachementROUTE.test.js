const request = require('supertest');
const app = require('../app'); 

jest.mock('../functions/sendingEmailWithJsonFileAttachement', () => jest.fn().mockResolvedValue({ messageId: '1' }));

describe('/send/email-json route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); 
  });

  it('should handle the email sending process with JSON correctly', async () => {
    const mockEmailData = {
      from: 'jackson@gmail.com',
      recipient: 'kahowang3659@gmail.com',
      jsonString: '{"message":"yooo yooo yooo"}',
    };

    const response = await request(app)
      .post('/send/email-json')
      .send(mockEmailData);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true); 
    expect(response.body.invoiceId).toEqual({messageId: '1'});

  });

  it('should throw an error if sending the email with JSON fails', async () => {
    const sendEmailWithJSON = require('../functions/sendingEmailWithJsonFileAttachement');
    sendEmailWithJSON.mockRejectedValueOnce(new Error('Failed to send email'));

    const mockEmailData = {
      from: 'jackson@gmail.com',
      recipient: 'kahowang3659@gmail.com',
      jsonString: '{"message":"yooo yooo yooo"}',
    };

    const response = await request(app)
      .post('/send/email-json')
      .send(mockEmailData);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false); 
    expect(response.body.error).toBe('Failed to send email');
  });
});
