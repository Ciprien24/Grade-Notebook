const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./passport-config');
const usersRouter = require('./routes/users');
const studentsRouter = require('./routes/students');
const path = require('path');
const app = express();

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', usersRouter);
app.use('/students', studentsRouter);

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  } else {
    res.redirect('/users/login');
  }
});

app.listen(5001, () => {
  console.log('Server started on http://localhost:5001');
});
