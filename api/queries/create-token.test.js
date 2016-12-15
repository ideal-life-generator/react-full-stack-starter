import api from '../index.test';
import { createRefreshToken, checkRefreshToken } from '../auth';

const testData = new Map();

suite('/createToken', () => {
  suiteSetup(async () => {
    testData.set('refreshToken', createRefreshToken({ test: 'test' }));
  });

  test('Required refresh token', async () => {
    await api.post('/createToken').expect(400, { refreshToken: 'Required' });
  });

  test('Should return new token', async () => {
    const refreshToken = testData.get('refreshToken');

    const { body: { token } } = await api.post('/createToken')
      .field('refreshToken', refreshToken)
      .expect(200);

    token.should.be.a.String();
    checkRefreshToken(token).should.have.property('test', 'test');
  });
});
