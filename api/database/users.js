import db from './';

export default db.model('user', {
  id: Number,
  name: String,
  email: String,
  password: String,
  feedback: String,
  varified: Boolean,
});
