const sendEmailWithMultipleJSON = require('./sendEmailWithMultipleJSON');
const sendEmailWithMultipleXML = require('./sendEmailWithMultXML');
const sendEmailWithXML = require('./sendingEmailFunction');
const sendEmailWithJSON = require('./sendingEmailWithJsonFileAttachment');

// this allows to send the invoice later and the delay is in minutes
function sendInvoiceLater(type, from, recipient, filesOrString, delayInMinutes) {
  return new Promise((resolve, reject) => {
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
        reject(new Error(`Unsupported type: ${type}`));
        return;
    }

    setTimeout(() => {
      sendFunction(from, recipient, filesOrString)
        .then(result => {
          console.log('Invoice sent successfully:', result);
          resolve(result);
        })
        .catch(error => {
          console.error('Error sending invoice:', error);
          reject(error);
        });
    }, delayInMinutes * 60 * 1000);
  });
}


module.exports = sendInvoiceLater;