

var LocalStrategy   = require('passport-local').Strategy;

var express = require('express');
var flash = require('express-flash')
var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');
var user = require('../models/').users;
var dbconfig = require('./database');
//var dbConfiguration = {};
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

/*connection.connect(function(err){
    if(err){
        throw err;
    }
});*/


var app = express();
app.use(flash());

module.exports = function (passport) {

	passport.serializeUser(function(user,done){
		done(null,user.id);
	});
	passport.deserializeUser(function(id,done){
		
	 connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
	});

	passport.use(
		'local-login',
		new LocalStrategy({
			usernameField :'email',
			passwordField :'password',
			passReqToCallback: true
		},
		function(req,email,password,done) {

			connection.query("SELECT * FROM users WHERE email = ?",[email],function(error,rows){
				if(error)
					return done(error);
				if(!rows.length) {
					return done(null,false,req.flash('loginMessage','No user found!'))
				}

				if(!bcrypt.compareSync(password,rows[0].password)){
					return done(null,false,req.flash('loginMessage','your email or password is incorrect!'))
				}

				return done(null,rows[0]);
			});

        })
    );
};

