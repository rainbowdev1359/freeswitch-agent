require('dotenv').config();
const axios = require('axios');
const twilio = require('twilio');

const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const NGROK_API_URL = 'http://127.0.0.1:4040/api/tunnels';

async function getNgrokUrl() {
  try {
    const response = await axios.get(NGROK_API_URL);
    const publicUrl = response.data.tunnels[0].public_url;
    return publicUrl;
  } catch (error) {
    console.error(`Error retrieving ngrok URL: ${error}`);
    return null;
  }
}

async function updateTwilioWebhooks(ngrokUrl) {
  const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
  
  try {
    const phoneNumber = await client.incomingPhoneNumbers
      .list({ phoneNumber: TWILIO_PHONE_NUMBER })
      .then(phoneNumbers => phoneNumbers[0]);

    if (phoneNumber) {
      await phoneNumber.update({
        voiceUrl: `${ngrokUrl}/voice`,
        voiceMethod: 'POST',
      });
      console.log(`Updated Twilio voice webhook to ${ngrokUrl}/voice`);

      await phoneNumber.update({
        statusCallback: `${ngrokUrl}/status`,
        statusCallbackMethod: 'POST',
      });
      console.log(`Updated Twilio status webhook to ${ngrokUrl}/status`);
    } else {
      console.error('Twilio phone number not found.');
    }
  } catch (error) {
    console.error(`Error updating Twilio webhooks: ${error}`);
  }
}

(async () => {
  const ngrokUrl = await getNgrokUrl();
  if (ngrokUrl) {
    await updateTwilioWebhooks(ngrokUrl);
  }
})();