const sendMultEmail = require('../functions/sendMultEmail');
const sendInvoiceLater = require('../functions/sendingInvoiceLater');

describe('sendInvoiceLater error handling', () => {
  test('throws an error for unsupported type', async () => {
    const type = 'unsupportedType';
    const from = 'test@test.com';
    const recipient = 'recipient@test.com';
    const filesOrString = '{"test": "data"}';
    const delayInMinutes = 1;

    // Adjusted for asynchronous testing
    await expect(sendInvoiceLater(type, from, recipient, filesOrString, delayInMinutes))
      .rejects
      .toThrow(`Unsupported type: ${type}`);
  });
});

describe('sendMultEmail error handling', () => {
  test('throws an error for unsupported type', async () => {
    const type = 'unsupportedType';
    const from = 'test@test.com';
    const recipient = ['recipient@test.com','swaggy'];
    const filesOrString = '{"test": "data"}';

    // Adjusted for asynchronous testing
    await expect(sendMultEmail(type, from, recipient, filesOrString))
      .rejects
      .toThrow(`Unsupported type: ${type}`);
  });
});

