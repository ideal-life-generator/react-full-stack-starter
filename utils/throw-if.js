export default (errorOrCondition, error) => {
  if (error && errorOrCondition) {
    throw error;
  } else if (errorOrCondition) {
    throw errorOrCondition;
  }
};
