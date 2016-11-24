export default (initialState, handlers) => (state = initialState, { type, ...payload }) => {
  const { [type]: action } = handlers;

  if (action) {
    return action(state, payload);
  }
    
  return state;
}
