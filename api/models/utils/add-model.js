import mongoose from 'mongoose';

export default (modelName, schema) => {
  try {
    return mongoose.model(modelName);
  } catch (error) {
    return mongoose.model(modelName, schema);
  }
};
