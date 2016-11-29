export default (dispatch, components, params) => {
  const asyncActions = components.reduce((prev, { asyncActions, WrappedComponent }) => {
    let currentAsyncActions = [];

    if (asyncAction || WrappedComponent.asyncAction) {
      currentAsyncActions.push(asyncActions);
    }

    if (asyncActions) {
      currentAsyncActions.concat(asyncActions);
    }

    currentAsyncActions = currentAsyncActions.concat(asyncActions || []);

    return 
      .concat((current.WrappedComponent ? current.WrappedComponent.needs : []) || [])
      .concat(prev);
  }, []);

  const promises = needs.map(need => dispatch(need(params)));

  return Promise.all(promises);
};
