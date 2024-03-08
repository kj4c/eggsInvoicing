const twilio = require('twilio');

const accountSid = 'AC7b5368acf509f230d72e41f6ed7acc9b';
const authToken = 'd69fee5952dfc4028c4dbb4ad21f1a49';
const twilioPhoneNumber = '+610421487088';

const client = new twilio(accountSid, authToken);

async function sendSMS(from, to, body) {
  try {
    const message = await client.messages.create({
      body: body,
      from: twilioPhoneNumber, // Twilio number
      to: to // Recipient's phone number
    });

    console.log(`Message sent: ${message.sid}`);

    // Here you can implement database logic similar to your email function
    // For example, saving the SMS details to your database

    return message.sid;
  } catch (error) {
    console.error('Failed to send SMS:', error);
    throw error;
  }
}

module.exports = sendSMS;