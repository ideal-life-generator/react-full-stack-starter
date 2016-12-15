const devServerHost = 'http://localhost';
const devServerPort = 3000;
const serverHost = 'http://localhost';
const serverPort = 5000;
const apiHost = 'http://localhost';
const apiPort = 5001;
const mongoDBServer = 'mongodb://test:test@ds115738.mlab.com:15738/react-full-stack-starter';

const url = `${devServerHost}:${devServerPort}`;

const secret = 'test';
const googleClientId = '755454114935-j1m118q4e3p2bs7jprd9nl272qv4cnqe.apps.googleusercontent.com';
const googleClientSecret = 'ccvqAqqEsluc5Ha1P8ZkXU1F';
const googleRedirectUrl = `${url}/oauth2.html?action=google`;

module.exports = {
  devServerHost,
  devServerPort,
  serverHost,
  serverPort,
  apiHost,
  apiPort,
  mongoDBServer,
  url,
  secret,
  googleClientId,
  googleClientSecret,
  googleRedirectUrl,
};
