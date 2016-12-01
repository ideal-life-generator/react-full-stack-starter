import User from '../models/User';

export default async () => {
  try {
    const collection = await User
      .find(null, 'name email feedback');

    const result = {
      collection,
    };

    return result;
  } catch (error) {
    throw error;
  }
};
