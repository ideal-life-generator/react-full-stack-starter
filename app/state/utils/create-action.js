export default (type, ...argNames) => (...args) => {
  const payload = argNames.reduce((container, arg, index) => {
    const { [index]: argName } = argNames;
    const { [index]: argValue } = args;

    return { ...container, [argName]: argValue };
  }, {});

  return {
    type,
    ...payload,
  };
};
