var express = require('express');
var passport = require('../middlewares/authentication');
var Redirect = require('../middlewares/redirect');

module.exports = {
  registerRouter() {
    var router = express.Router();

    router.get('/', Redirect.ifLoggedIn('/'), this.index);
    router.post('/', this.login);

    return router;
  },
  index(req, res) {
    res.render('login', { error: req.flash('error') });
  },
  login(req, res) {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: true,
    })(req, res);
  },
};
