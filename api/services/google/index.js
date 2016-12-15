import { plus as plusAPI, auth } from 'googleapis';
import { googleClientId, googleClientSecret, googleRedirectUrl } from '../../../config';

const { OAuth2 } = auth;

export const plus = plusAPI('v1');

export const oAuth2 = new OAuth2(googleClientId, googleClientSecret, googleRedirectUrl);
