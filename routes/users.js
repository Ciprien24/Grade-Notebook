const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const User = require('../models/User');

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.post('/login', passport.authenticate('local', {
  successRedirect: 'http://localhost:5001',
  failureRedirect: '/login',
  failureFlash: true,
}));


router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/register.html'));
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (e) {
    res.redirect('/register');
  }
});

module.exports = router;
