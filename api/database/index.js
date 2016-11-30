import mongoose from 'mongoose';
import { mongoDBServer } from '../../config';

mongoose.Promise = global.Promise;

mongoose.connect(mongoDBServer, () => {
  console.log(`MongoBD connected to ${mongoDBServer} server.`);
});

export default mongoose;
export users from './users';
