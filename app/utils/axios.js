import { create } from 'axios';
import { apiHost, apiPort } from '../../config';

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

export default create({
  baseURL: generateBaseURL(),
  transformRequest: [formDataRequest()],
});
