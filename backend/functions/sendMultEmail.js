const sendEmailWithMultipleJSON = require('./sendEmailWithMultipleJSON');
const sendEmailWithMultipleXML = require('./sendEmailWithMultXML');
const sendEmailWithXML = require('./sendingEmailFunction');
const sendEmailWithJSON = require('./sendingEmailWithJsonFileAttachment');

async function sendMultEmail(type, from, recipients, filesOrString) {
  let sendFunction;
  switch (type.toLowerCase()) {
  case 'multiplejson':
    sendFunction = sendEmailWithMultipleJSON;
    break;
  case 'multiplexml':
    sendFunction = sendEmailWithMultipleXML;
    break;
  case 'xml':
    sendFunction = sendEmailWithXML;
    break;
  case 'json':
    sendFunction = sendEmailWithJSON;
    break;
  default:
    throw new Error(`Unsupported type: ${type}`);
  }

  let finalResults = [];
  for (let i = 0; i < recipients.length; i++) {
    try {
      const result =  await sendFunction(from, recipients[i], filesOrString);
      // console.log('Invoice sent successfully to recipient:', recipients[i] , 'Invoice ID:', result);
      finalResults.push(result);
    } catch (error) {
      console.error('Error sending invoice:', error);
    }
  }

  return finalResults;
}

module.exports = sendMultEmail;