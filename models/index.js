var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require(`${__dirname}/../config/config.json`)[env];
var db = {};

function getSequelize() {
  if (config.use_env_variable) {
    return new Sequelize(process.env[config.use_env_variable]);
  }
  return new Sequelize(config.database, config.username, config.password, config);
}

var sequelize = getSequelize();

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    var model = sequelize.import(path.join(__dirname, file));
    var modelName = `${model.name.charAt(0).toUpperCase()}${model.name.slice(1)}`;
    db[modelName] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
