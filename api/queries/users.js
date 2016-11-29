import users from '../database/users';

export default async () => {
  try {
    const collection = await users.find();

    const result = {
      collection,
    };

    return result;
  } catch (error) {
    throw error;
  }
};
