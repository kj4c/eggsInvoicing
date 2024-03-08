const request = require('supertest');
const app = require('../app'); 

jest.mock('../functions/sendingEmailFunction', () => jest.fn().mockResolvedValue({ messageId: '1' }));

describe('/send/email route', () => {
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
});