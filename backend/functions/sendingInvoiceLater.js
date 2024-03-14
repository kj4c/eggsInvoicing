const sendEmailWithMultipleJSON = require('./sendEmailWithMultipleJSON');
const sendEmailWithMultipleXML = require('./sendEmailWithMultXML');
const sendEmailWithXML = require('./sendingEmailFunction');
const sendEmailWithJSON = require('./sendingEmailWithJsonFileAttachment');

// this allows to send the invoice later and the delay is in minutes 
async function sendInvoiceLater(type, from, recipient, filesOrString, delayInMinutes) {
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

  setTimeout(async () => {
    try {
      const result = await sendFunction(from, recipient, filesOrString);
      console.log('Invoice sent successfully:', result);
      return result;
    } catch (error) {
      console.error('Error sending invoice:', error);
    }
  }, delayInMinutes * 60 * 1000);
}

module.exports = sendInvoiceLater;