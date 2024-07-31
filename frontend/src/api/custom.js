import axios from 'axios';

const makeCall = async (data) => {
  try {
    const response = await axios.post('http://54.185.78.240:5000/makeCall', {
        phone_number: data.phone_number,
        agent_id: data.agent_id
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error making call:', error);
  }
};

export default {
  makeCall
}