import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:1234@ds155747.mlab.com:55747/react-starter-kit', () => {
    console.log('MongoBD is connected.');
});
