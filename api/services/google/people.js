import { plus } from './';

export const get = async (...args) => new Promise((resolve, reject) => {
  plus.people.get(...args, (error, response) => (error ? reject(error) : resolve(response)));
});
