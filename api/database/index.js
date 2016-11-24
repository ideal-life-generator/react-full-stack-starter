import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://public:public@ds155747.mlab.com:55747/react-starter-kit', () => {
  console.log('MongoBD is connected to database.');
});

export default mongoose;
export users from './users';
