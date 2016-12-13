import { create } from 'axios';
import cookie from 'react-cookie';
import { apiHost, apiPort } from '../../../config';

function generateBaseURL() {
  return `${apiHost}:${apiPort}`;
}

function formDataRequest() {
  return (data) => {
    try {
      if (data) {
        const formData = Object.keys(data).reduce((formDataContainer, name) => {
          const { [name]: value } = data;

          formDataContainer.append(name, value);

          return formDataContainer;
        }, new FormData());

        return formData;
      }
    } catch (error) {
      throw error;
    }
  };
}

const axios = create({
  baseURL: generateBaseURL(),
  transformRequest: [formDataRequest()],
});

export function setDefaultHeader(header, value) {
  axios.defaults.headers.common[header] = value;
}

axios.interceptors.response.use(undefined, async (error) => {
  const { response, config } = error;

  if (response && config) {
    const { status, data } = response;

    if (status === 401 && data === 'Invalid token') {
      try {
        const refreshToken = cookie.load('refresh-token');

        const { data: { token } } = await axios.post('/createToken', { refreshToken });

        cookie.save('token', token);

        setDefaultHeader('token', token);

        config.headers.Authorization = token;

        return await axios(config);
      } catch (createTokenError) {
        cookie.remove('refresh-token');
        cookie.remove('token');
      }
    }
  }

  throw error;
});

export default axios;

// https://www.npmjs.com/package/react-cookie#setrawcookiecookies
