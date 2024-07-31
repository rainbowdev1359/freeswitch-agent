import axios from 'axios';
const telephonyBaseURL = import.meta.env.VITE_TELEPHONY_BASE_URL;
const telephonyBaseURLES = import.meta.env.VITE_TELEPHONY_BASE_URL_ES;

export const make_call = async (phone: string, name: string) => {
  const url = `${telephonyBaseURL}/make_call?phone=${phone}&name=${name}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    return error
  }
}

export const make_call_es = async (phone: string, name: string) => {
  const url = `${telephonyBaseURLES}/make_call?phone=${phone}&name=${name}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    return error
  }
}


export default make_call