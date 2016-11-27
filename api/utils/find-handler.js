export default (queries, url, method) => {
  const queryUrl = url.slice(1);

  if (queryUrl) {
    const { [queryUrl]: queryMethods } = queries;

    if (queryMethods) {
      const { [method]: handler } = queryMethods;

      return handler;
    }
  }
};
