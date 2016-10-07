var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var express = require('express');
var expressSession = require('express-session');
var flash = require('connect-flash');
var methodOverride = require('method-override');
//var passport = require('');


var app = express();
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession(({ secret: 'keyboard cat', resave: false, saveUninitialized: true })));
app.use(flash());
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(express.static('./public'));

// views engine
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);

// Sequelize initialization
var sequelize = new Sequelize('playnow', 'playnow', 'ctp2016', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }

});

app.use(require('./controllers/'));

// models.sequelize.sync().then(() => {
//   app.listen(3000);
// });

// END

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
