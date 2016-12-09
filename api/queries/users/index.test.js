import api from '../../index.test';
import User from '../../database/User';

const testData = new Map();

testData.set('userPayload', {
  name: 'Test Username',
  email: 'test@email.test',
  password: 'test_password',
  feedback: 'Test feedback',
});

suite('/users', () => {
  suiteSetup(async () => {
    const userPayload = testData.get('userPayload');
    const { email } = userPayload;

    const user = await User.findOneAndUpdate({ email }, userPayload, { upsert: true, new: true });

    testData.set('user', user);
  });

  suiteTeardown(async () => {
    const { email } = testData.get('user');

    await User.findOneAndRemove({ email });
  });

  test('Should return users collection', async () => {
    const {
      body: {
        collection,
        collection: {
          0: { _id, name, email, password, feedback },
        },
      },
    } = await api.get('/users').expect(200);

    collection.should.be.a.Array();
    _id.should.be.a.String();
    name.should.be.a.String();
    // should.not.exist(email);
    // should.not.exist(password);
    feedback.should.be.a.String();
  });
});
