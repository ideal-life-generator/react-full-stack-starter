import users from '../database/users';

export function GET() {
  return new Promise(async (resolve, reject) => {
    try {
      const usersResult = await users.find();

      resolve(usersResult);
    } catch (error) {
      reject(error);
    }
  });
}
