import users from '../database/users';

export function GET() {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = await users.find();

      const result = {
        collection,
      };

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
