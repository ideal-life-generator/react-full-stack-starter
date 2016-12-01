import axios from 'axios';
import { apiHost, apiPort } from '../../../config';

export default axios.create({
  baseURL: `${apiHost}:${apiPort}`,
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
