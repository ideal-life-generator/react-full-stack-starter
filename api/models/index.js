import mongoose from 'mongoose';
import { mongoDBServer } from '../../config';

mongoose.Promise = global.Promise;

export default mongoose.connect(mongoDBServer, () => {
  console.log(`MongoBD connected to ${mongoDBServer} server.`);
});

export User from './User';
