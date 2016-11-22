export * as users from './users';

function removeSlash(url) {
  const isStartedFromSlash = url.indexOf('/') === 0;

  if (isStartedFromSlash) {
    const withoutSlash = url.slice(1);

    return withoutSlash;
  } else {
    return url;
  }
}

function findAction(actions, url, method) {
  const urlWithoutSlash = removeSlash(url);

  if (urlWithoutSlash) {
    const actionMethods = actions[urlWithoutSlash];

    if (actionMethods) {
      const action = actionMethods[method];

      return action;
    }
  }
};

export default (actions) => {
  return async ({ url, method }, res, next) => {
    const action = findAction(actions, url, method);

    if (action) {
      try {
        const actionResult = await action();

        res.send(actionResult);
      } catch (error) {
        res.status(400).end(error.message);
      }
    } else {
      next();
    }
  }
}
