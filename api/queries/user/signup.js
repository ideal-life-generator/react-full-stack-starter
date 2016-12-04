// import parseError from '../../utils/parse-error';

export async function POST({ User }, { body }) {
  try {
    const user = await User.create(body);

    const result = user.public();

    return result;
  } catch (error) {
    throw error;
  }
}
