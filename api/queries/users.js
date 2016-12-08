export default async ({ User }) => {
  const collection = await User.find(null, 'name feedback');

  return {
    collection,
  };
};
