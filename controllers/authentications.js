module.exports = {
  register: authenticationRegister,
  login: authenticationLogin
};

const User = require('../models/user');
const jwt  = require('jsonwebtoken');
const config = require('../config/config');

function authenticationRegister(req, res){
  User.create(req.body.user, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong' });

    const token = jwt.sign(user._id, config.secret, { expiresIn: 60*60*24 });

    return res.status(201).json({
      message: `Welcome ${user.username}!`,
      user,
      token
    });
  });
}

function authenticationLogin(req, res){
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong' });
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({ message: 'Unauthorised' });
    }

    const token = jwt.sign(user._id, config.secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      message: 'Welcome back',
      user,
      token
    });
  });
}
