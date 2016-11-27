export default (type, ...argNames) => (...args) => {
  let action = { type };

  argNames.forEach((arg, index) => {
    console.log(argNames[index], args[index]);

    action[argNames[index]] = args[index];
  });

  return action;
};
