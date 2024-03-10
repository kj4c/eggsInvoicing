const sendInvoiceLater = require('../functions/sendingInoiceLater');

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
