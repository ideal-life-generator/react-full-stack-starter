import axios from 'axios';
import { createRefreshToken, createToken } from '../../auth';
import { oAuth2 } from '../../services/google';
import * as people from '../../services/google/people';
import { googleClientId, googleClientSecret, googleRedirectUrl } from '../../../config';
import { googleOAuth2Validation } from '../../../utils/is';

export async function POST({ req: { body: { code } }, models: { User } }) {
  try {
    const googleTokenUrl = 'https://www.googleapis.com/oauth2/v4/token';

    const { data: { access_token } } = await axios({
      method: 'POST',
      url: googleTokenUrl,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: {
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: googleRedirectUrl,
        grant_type: 'authorization_code',
      },
    });

    oAuth2.setCredentials({ access_token });

    const { displayName: name, emails: [{ value: email }] } = await people.get({
      userId: 'me',
      auth: oAuth2,
    });

    const user = await User.findOne({ email })
      || await User.findOneAndUpdate({ email }, { name, email }, { upsert: true, new: true });

    const userPublic = user.public();

    const { _id } = userPublic;

    return {
      ...userPublic,
      refreshToken: createRefreshToken({ _id }),
      token: createToken({ _id }),
    };
  } catch (error) {
    throw new Error('Google OAuth2 profile request is failed');
  }
}

POST.validate = googleOAuth2Validation;
