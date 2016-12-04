import ExtendableError from 'es6-error';

export class QueryError extends ExtendableError {
  name = 'QueryError';
}

export default (queries, url, method) => {
  try {
    const queryUrl = url.slice(1);
    const queryParts = queryUrl.split('/');
    const queryMethods = queryParts.reduce((currentQuery, path) => currentQuery[path], queries);

    const { default: defaultHandler, [method]: handler } = queryMethods;

    if (method === 'GET' && typeof defaultHandler === 'function') {
      return defaultHandler;
    } else if (typeof handler === 'function') {
      return handler;
    }

    throw new Error();
  } catch (error) {
    throw new QueryError('Query not found');
  }
};
