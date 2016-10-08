var express = require('express');
var fs = require('fs');
var path = require('path');

var router = express.Router();
var basename = path.basename(module.filename);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    var fileName = file.substr(0, file.length - 3);
    router.use(`/${fileName}`, require(`./${fileName}`).registerRouter());
  });

router.get('/', (req, res) => {
  res.render('homepage');
});

module.exports = router;
