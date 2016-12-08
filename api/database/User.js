import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import pick from 'lodash.pick';
import isEmail from 'validator/lib/isEmail';
import addModel from './utils/add-model';

const userSchema = Schema({
  name: {
    type: String,
    required: [true, 'Required'],
    minlength: [2, 'Must be 2 characters or more'],
  },
  email: {
    type: String,
    required: [true, 'Required'],
    validate: {
      validator: value => isEmail(value),
      message: 'Invalid',
    },
    unique: true,
    uniqueCaseInsensitive: true,
  },
  password: {
    type: String,
    required: [true, 'Required'],
    minlength: [6, 'Must be 6 characters or more'],
  },
  feedback: String,
});

userSchema.plugin(uniqueValidator, { message: 'Already in use' });

userSchema.method('public', function PublicMethod() {
  return pick(this, '_id', 'name', 'feedback');
});

export default addModel('User', userSchema);
