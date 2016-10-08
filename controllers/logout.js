var express = require('express');

module.exports = {
  registerRouter() {
    var router = express.Router();

    router.post('/', this.logout);

    return router;
  },
  logout(req, res) {
    req.logout();
    res.redirect('/');
  },
};
