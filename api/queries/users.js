export default async ({ User }) => {
  try {
    const collection = await User.find(null, 'name feedback');

    const result = {
      collection,
    };

    return result;
  } catch (error) {
    throw error;
  }
};
