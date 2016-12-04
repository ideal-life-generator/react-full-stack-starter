import { apiTestHost, apiTestPort } from '../../config';

const apiUrl = `${apiTestHost}:${apiTestPort}`;

function parsePath(path) {
  const hasSlash = path.indexOf('/') === 0;

  if (hasSlash) {
    return path;
  }

  return `/${path}`;
}

export default function makeUrl(baseUrl) {
  return path => `${baseUrl}${parsePath(path)}`;
}

export const api = makeUrl(apiUrl);
