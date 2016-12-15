import ExtendableError from 'es6-error';

export class QueryError extends ExtendableError {
  name = 'QueryError';
}

export default (queries, url, method) => {
  try {
    const queryUrl = url.slice(1);
    const queryParts = queryUrl.split('/');
    const queryMethods = queryParts.reduce((currentQuery, path) => currentQuery[path], queries);

    const { default: defaultQuery, [method]: query } = queryMethods;

    if (method === 'GET' && typeof defaultQuery === 'function') {
      return defaultQuery;
    } else if (typeof query === 'function') {
      return query;
    }

    throw new Error();
  } catch (error) {
    throw new QueryError('Query not found');
  }
};
