export default ({ dispatch }) => next => async (action) => {
  const { types, fetch } = action;

  if (fetch) {
    if (!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof fetch !== 'function') {
      throw new Error('Expected fetch to be a function.');
    }

    const [REQUEST_TYPE, SUCCESS_TYPE, FAILURE_TYPE] = types;

    try {
      dispatch({ type: REQUEST_TYPE });

      const response = await fetch();

      dispatch({ type: SUCCESS_TYPE, ...response });
    } catch (error) {
      dispatch({ type: FAILURE_TYPE, ...error });
    }
  } else {
    next(action);
  }
};
