const mongoose = require('mongoose');
const Cat = require('../models/cat');

mongoose
  .connect('mongodb://localhost:27017/tinder-cats', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB 🚀');
  })
  .then(() =>
    Cat.create({
      name: 'Garfield',
    }),
  )
  .then(() => {
    console.log('cat created');
  })
  .catch(error => {
    console.log('error ', error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
