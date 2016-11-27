import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5001',
  transformRequest: [(data) => {
    if (data) {
      const formData = new FormData();

      Object.keys(data).forEach((prop) => {
        formData.append(prop, data[prop]);
      });

      return formData;
    }
  }],
});
