const accountSid = 'AC99076d0a5f49f07bbaef91800d3d6710';
const authToken = 'f9f71bdcc60a65f99bbcdbef5d986579';
const client = require('twilio')(accountSid, authToken);

// this is the function for sms testing that is no longer used
client.messages
  .create({
    body: 'hey how you doing broski',
    from: '+13087374083',
    to: '+610421487088'
  })
  .then(message => console.log(message.sid)).catch(err => console.log(err));