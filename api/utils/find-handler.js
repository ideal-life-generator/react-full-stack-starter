export default (queries, url, method) => {
  const queryUrl = url.slice(1);

  if (queryUrl) {
    const { [queryUrl]: queryMethods } = queries;

    if (queryMethods) {
      const { ['default']: getHandler, [method]: handler } = queryMethods;

      if (method === 'GET' && queryMethods.default) {
        return getHandler;
      }

      return handler;
    }
  }
};
