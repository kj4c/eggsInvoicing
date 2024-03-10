jest.mock('../functions/sendEmailWithMultipleJSON', () => jest.fn());
jest.mock('../functions/sendEmailWithMultXML', () => jest.fn());
jest.mock('../functions/sendingEmailFunction', () => jest.fn());
jest.mock('../functions/sendingEmailWithJsonFileAttachment', () => jest.fn());

// Now import the functions; they will be Jest mock functions
const sendEmailWithMultipleJSON = require('../functions/sendEmailWithMultipleJSON');
const sendEmailWithMultipleXML = require('../functions/sendEmailWithMultXML');
const sendEmailWithXML = require('../functions/sendingEmailFunction');
const sendEmailWithJSON = require('../functions/sendingEmailWithJsonFileAttachment');

const sendInvoiceLater = require('../functions/sendingInvoiceLater');
beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
});

afterEach(() => {
  jest.useRealTimers();
});

test('sendInvoiceLater calls the correct function with JSON type after specified delay', async () => {
  const type = 'json';
  const from = 'test@test.com';
  const recipient = 'recipient@test.com';
  const jsonString = '{"test": "data"}';
  const delayInMinutes = 1;

  sendInvoiceLater(type, from, recipient, jsonString, delayInMinutes);

  jest.advanceTimersByTime(delayInMinutes * 60 * 1000 );

  expect(sendEmailWithJSON).toHaveBeenCalledWith(from, recipient, jsonString);
});

test('sendInvoiceLater calls the correct function with multiplejson type after specified delay', async () => {
  const type = 'multiplejson';
  const from = 'test@test.com';
  const recipient = 'recipient@test.com';
  const filesOrString = [{filename: 'file1.json', content: '{"test": "data1"}'}, {filename: 'file2.json', content: '{"test": "data2"}'}];
  const delayInMinutes = 1;

  sendInvoiceLater(type, from, recipient, filesOrString, delayInMinutes);

  jest.advanceTimersByTime(delayInMinutes * 60 * 1000);

  expect(sendEmailWithMultipleJSON).toHaveBeenCalledWith(from, recipient, filesOrString);
});

test('sendInvoiceLater calls the correct function with multiplexml type after specified delay', async () => {
  const type = 'multiplexml';
  const from = 'test@test.com';
  const recipient = 'recipient@test.com';
  const filesOrString = [{filename: 'file1.xml', content: '<data>value1</data>'}, {filename: 'file2.xml', content: '<data>value2</data>'}];
  const delayInMinutes = 1;

  sendInvoiceLater(type, from, recipient, filesOrString, delayInMinutes);

  jest.advanceTimersByTime(delayInMinutes * 60 * 1000);

  expect(sendEmailWithMultipleXML).toHaveBeenCalledWith(from, recipient, filesOrString);
});

test('sendInvoiceLater calls the correct function with xml type after specified delay', async () => {
  const type = 'xml';
  const from = 'test@test.com';
  const recipient = 'recipient@test.com';
  const xmlString = '<invoice><id>123</id></invoice>';
  const delayInMinutes = 1;

  sendInvoiceLater(type, from, recipient, xmlString, delayInMinutes);

  jest.advanceTimersByTime(delayInMinutes * 60 * 1000);

  expect(sendEmailWithXML).toHaveBeenCalledWith(from, recipient, xmlString);
});

jest.mock('../functions/sendingEmailWithJsonFileAttachment', () => jest.fn().mockImplementation(() => {
  throw new Error('Test error from sendEmailWithJSON');
}));

test('logs an error if sending function fails', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  const type = 'json';
  const from = 'test@test.com';
  const recipient = 'recipient@test.com';
  const jsonString = '{"test": "data"}';
  const delayInMinutes = 1;

  sendInvoiceLater(type, from, recipient, jsonString, delayInMinutes);

  jest.advanceTimersByTime(delayInMinutes * 60 * 1000);

  expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending invoice:', expect.any(Error));

  consoleErrorSpy.mockRestore();
});

