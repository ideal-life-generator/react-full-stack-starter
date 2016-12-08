import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export async function connect(mongoDBServer) {
  await mongoose.connect(mongoDBServer, () => {
    console.info(`MongoDB is connected to ${mongoDBServer}.`);
  });

  return async () => {
    await mongoose.disconnect();

    console.info('MongoDB is disconnected.');
  };
}

export User from './User';
