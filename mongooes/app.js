const mongooes = require('mongoose');
mongooes.connect('mongodb://127.0.0.1:27017/mongooes-test');

const validator = require('validator');
const { Schema } = mongooes;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    validate: {
      validator: (value) => {
        //if (!value.includes('@')) throw new Error('This is not an Email');
        if (!validator.isEmail(value)) throw new Error('This is not an Email');
      },
    },
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
  },
});

const User = mongooes.model('User', userSchema);

const newUser = new User({
  name: 'lee',
  email: '123gmail.com',
  password: '12345',
  age: 25,
});

// newUser.save().then((value) => {
//   console.log(`res:`, value);
// });

User.findOne({ name: 'lee' })
  .select('name -_id')
  .then((value) => console.log(value));
