import User from '../../database/User';

export default async () => {
  const collection = await User.find(null, 'name feedback');

  return {
    collection,
  };
};

export * as me from './me';
