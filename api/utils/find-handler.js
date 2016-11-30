export default (queries, url, method) => {
  const queryUrl = url.slice(1);

  if (queryUrl) {
    const { [queryUrl]: queryMethods } = queries;

    if (queryMethods) {
      const { default: defaultHandler, [method]: handler } = queryMethods;

      if (method === 'GET' && defaultHandler) {
        return defaultHandler;
      }

      return handler;
    }
  }
};
