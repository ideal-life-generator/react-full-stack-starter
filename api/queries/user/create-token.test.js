import api from '../../index.test';
import { createRefreshToken, checkRefreshToken } from '../../authorization';

const testData = new Map();

suite('/user/createToken', () => {
  suiteSetup(async () => {
    testData.set('refreshToken', createRefreshToken({ test: 'test' }));
  });

  test('Required refresh token', async () => {
    await api.post('/user/createToken').expect(400, { refreshToken: 'Required' });
  });

  test('Should return new token', async () => {
    const refreshToken = testData.get('refreshToken');

    const { body: { token } } = await api.post('/user/createToken')
      .field('refreshToken', refreshToken)
      .expect(200);

    token.should.be.a.String();
    checkRefreshToken(token).should.have.property('test', 'test');
  });
});
