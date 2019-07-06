/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var mysql = require('mysql');
var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
/*var controllers = require('./controllers');
*/var Sequelize = require('sequelize');
var config = require('./config');
var sequelize = new Sequelize(config.database.db, config.database.user,  config.database.password, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },


  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

var app = express();
module.exports = bcrypt;
require('./config/passport')(passport); // pass passport for configuration

//var myConnection  = require('express-myconnection')


/*var dbOptions = {
    host:      config.database.host,
    user:       config.database.user,
    password: config.database.password,
    port:       config.database.port, 
    database: config.database.db
};*/
//app.use(myConnection(mysql,dbOptions,'pool'));



//app.use(bodyParser.json())


app.set('view engine', 'ejs')
const ejsLint = require('ejs-lint');

var expressValidator = require('express-validator')
app.use(expressValidator())

 
/**
 * body-parser module is used to read HTTP POST data
 * it's an express middleware that reads form's input 
 * and store it as javascript object
 */ 
/**
 * bodyParser.urlencoded() parses the text as URL encoded data 
 * (which is how browsers tend to send form data from regular forms set to POST) 
 * and exposes the resulting object (containing the keys and values) on req.body.
 */ 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
 
 
/**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported
 */ 
 
/**
 * using custom logic to override method
 * 
 * there are other ways of overriding as well
 * like using header & using query value
 */ 
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
 
/**
 * This module shows flash messages
 * generally used to show success or error messages
 * 
 * Flash messages are stored in session
 * So, we also have to install and use 
 * cookie-parser & session modules
 */ 

 
app.use(cookieParser('NodejsApp'))
app.use(session({ 
    secret: 'NodejsApp',
    resave: true,
    saveUninitialized: true,
    cookie: {  secure: false,maxAge: 60000 }
}))
/*  PASSPORT SETUP  */

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var index = require('./routes/index')
var users = require('./routes/users')
require('./controller/auth.js')(app, passport,sequelize); 
require('./controller/employees.js')(app, sequelize);

//app.use('/', index)
app.use('/login', index)
app.use('/users', users)
//app.use('/employee', employee)

//The 404 Route (ALWAYS Keep this as the last route)
/*app.get('*', function (req, res) {
  res.render('front/errors/404', {
      page_title: "404 Error Page |"
  });
});
*/


//app.use(app.router);

app.listen(3000, function(){
    console.log('Server running at port 3000: http://127.0.0.1:3000')
})
