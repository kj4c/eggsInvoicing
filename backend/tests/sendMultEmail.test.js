jest.mock('../functions/sendEmailWithMultipleJSON', () => jest.fn());
jest.mock('../functions/sendEmailWithMultXML', () => jest.fn());
jest.mock('../functions/sendingEmailFunction', () => jest.fn());
jest.mock('../functions/sendingEmailWithJsonFileAttachment', () => jest.fn());

// Now import the functions; they will be Jest mock functions
const sendEmailWithMultipleJSON = require('../functions/sendEmailWithMultipleJSON');
const sendEmailWithMultipleXML = require('../functions/sendEmailWithMultXML');
const sendEmailWithXML = require('../functions/sendingEmailFunction');
const sendEmailWithJSON = require('../functions/sendingEmailWithJsonFileAttachment');

const sendMultEmail = require('../functions/sendMultEmail');
beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
});

test('sendMultEmail calls the correct function with JSON type', async () => {
  const type = 'json';
  const from = 'test@test.com';
  const recipients = ['recipients@test.com', 'yall@gmail.com'];
  const jsonString = '{"test": "data"}';

  sendMultEmail(type, from, recipients, jsonString);

  for (let i = 0; i < recipients.length; i++) {
    expect(sendEmailWithJSON).toHaveBeenCalledWith(from, recipients[i], jsonString);
  }
});

test('sendMultEmail calls the correct function with multiplejson type', async () => {
  const type = 'multiplejson';
  const from = 'test@test.com';
  const recipients = ['jang@gmail.com', 'recipients@test.com'];
  const filesOrString = [{filename: 'file1.json', content: '{"test": "data1"}'}, {filename: 'file2.json', content: '{"test": "data2"}'}];

  await sendMultEmail(type, from, recipients, filesOrString);

  expect(sendEmailWithMultipleJSON).toHaveBeenCalledTimes(2);

  for (let i = recipients.length - 1; i !== 0; i--) {
    expect(sendEmailWithMultipleJSON).toHaveBeenCalledWith(from, recipients[i], filesOrString);
  }

});

test('sendMultEmail calls the correct function with multiplexml type', async () => {
  const type = 'multiplexml';
  const from = 'test@test.com';
  const recipients = ['recipients@test.com', 'yall@gmail.com'];
  const filesOrString = [{filename: 'file1.xml', content: '<data>value1</data>'}, {filename: 'file2.xml', content: '<data>value2</data>'}];

  await sendMultEmail(type, from, recipients, filesOrString);

  for (let i = 0; i < recipients.length; i++) {
    expect(sendEmailWithMultipleXML).toHaveBeenCalledWith(from, recipients[i], filesOrString);
  }
});

test('sendMultEmail calls the correct function with xml type', async () => {
  const type = 'xml';
  const from = 'test@test.com';
  const recipients = ['recipients@test.com', 'yall@gmail.com'];
  const xmlString = '<invoice><id>123</id></invoice>';

  await sendMultEmail(type, from, recipients, xmlString);

  for (let i = 0; i < recipients.length; i++) {
    expect(sendEmailWithXML).toHaveBeenCalledWith(from, recipients[i], xmlString);
  }
});

jest.mock('../functions/sendingEmailWithJsonFileAttachment', () => jest.fn().mockImplementation(() => {
  throw new Error('Test error from sendEmailWithJSON');
}));

test('logs an error if sending function fails', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  const type = 'json';
  const from = 'test@test.com';
  const recipients = ['recipients@test.com', 'yall@gmail.com'];
  const jsonString = '{"test": "data"}';

  await sendMultEmail(type, from, recipients, jsonString);

  expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending invoice:', expect.any(Error));

  consoleErrorSpy.mockRestore();
});

