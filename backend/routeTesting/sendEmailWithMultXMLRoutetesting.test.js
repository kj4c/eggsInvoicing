const request = require('supertest');
const app = require('../app'); 

jest.mock('../functions/sendEmailWithMultXML', () => jest.fn().mockResolvedValue([1, 2])); // returns directly an array


describe('/send/multiInvoice route', () => {
  it('should send an email with multiple XML files attached', async () => {
    const mockEmailData = {
      from: 'Test Sender',
      recipient: 'kahowang3659@gmail.com',
      xmlFiles: [
        {
          xmlString: `<?xml version="1.0"?>
          <note>
            <to>Tove</to>
            <from>Jani</from>
            <heading>Reminder</heading>
            <body>Don't forget me this weekend!</body>
          </note>`,
          filename: 'note.xml'
        },
        {
          xmlString: `<?xml version="1.0"?>
          <invoice>
            <to>Client</to>
            <from>Service Provider</from>
            <due>30 days</due>
            <amount>100.00</amount>
          </invoice>`,
          filename: 'invoice.xml'
        }
      ]
    };

    const response = await request(app)
      .post('/send/multiInvoice')
      .send(mockEmailData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      invoiceIds: expect.any(Array) 
    });
  });
});

const sendEmailWithMultipleXML = require('../functions/sendEmailWithMultXML');

describe('/send/multiInvoice route error handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });


  it('should return an error response if sending fails', async () => {
    sendEmailWithMultipleXML.mockRejectedValueOnce(new Error('Sending failed'));

    const mockEmailData = {
      from: 'Test Sender',
      recipient: 'kahowang3659@gmail.com',
      xmlFiles: [
        {
          xmlString: `<?xml version="1.0"?>
          <note>
            <to>Tove</to>
            <from>Jani</from>
            <heading>Reminder</heading>
            <body>Don't forget me this weekend!</body>
          </note>`,
          filename: 'note.xml'
        },
        {
          xmlString: `<?xml version="1.0"?>
          <invoice>
            <to>Client</to>
            <from>Service Provider</from>
            <due>30 days</due>
            <amount>100.00</amount>
          </invoice>`,
          filename: 'invoice.xml'
        }
      ]
    };

    const response = await request(app)
      .post('/send/multiInvoice')
      .send(mockEmailData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: 'Failed to send email.'
    });
  });
});

