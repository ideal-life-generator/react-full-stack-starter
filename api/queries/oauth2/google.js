import passport from 'passport';

const getGoogleAccess = ({ code, origin }) => new Promise((resolve, reject) => {
  passport.authenticate('google', { scope: ['profile'], callbackURL: origin }, (error, user) => {
    if (error) {
      reject(error);
    } else {
      resolve(user);
    }
  })({ query: { code } });
});

export async function POST({ body: { code, origin } }) {
  try {
    const user = await getGoogleAccess({ code, origin });

    console.log(user);

    return user;
  } catch (error) {
    console.log(error);
  }
}
