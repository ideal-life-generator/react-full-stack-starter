import axios from 'axios';
import { apiHost, apiPort, apiTestHost, apiTestPort } from '../../config';

const { env: { NODE_ENV } } = process;

function generateBaseUrl() {
  if (NODE_ENV === 'testing') {
    return `${apiTestHost}:${apiTestPort}`;
  }

  return `${apiHost}:${apiPort}`;
}

export default axios.create({
  baseURL: generateBaseUrl(),
  transformRequest: [(data) => {
    if (data) {
      const formData = new FormData();

      Object.keys(data).forEach((prop) => {
        const { [prop]: value } = data;

        formData.append(prop, value);
      });

      return formData;
    }
  }],
});
