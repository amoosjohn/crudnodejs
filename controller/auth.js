var bcrypt = require('bcrypt-nodejs');
const User = require('../models/').users;
var passport = require('passport');
var middleware = require('../middleware');
console.log(middleware);
module.exports = function (app) {
app.get('/',  function(req, res,next) {
    // render to views/index.ejs template file
    res.render('index');
    
});
app.get('/login', function(req, res,next) {
    // render to views/index.ejs template file
    res.render('index');
    
});

app.post('/login',passport.authenticate('local-login', {
        successRedirect: '/dashboard', // redirect to the secure profile section
        failureRedirect: '/', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }), function(req, res) {


     if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
       req.session.cookie.expires = false;
    }
    res.redirect('/');
    
});

app.get('/signup',  function(req, res,next) {
    // render to views/signup.ejs template file
     res.render('signup');
    
});

app.post('/signup', function(req, res) {
    req.assert('name','Name is required!').notEmpty();
    req.assert('email','Email is required!').notEmpty();
    req.assert('email','A valid email is required!').isEmail();
    req.assert('password','Password is required!').notEmpty();

    var errors = req.validationErrors();
    if(!errors) {
        User.findOne({where:{email:req.body.email} }).then((users)=>{
            req.flash('error', 'Email already exist!');
            res.redirect('/signup');
        });

        var password = bcrypt.hashSync(req.body.password,null, null);
        User.create({
            name:req.body.name,
            email:req.body.email,
            password:password,
            status:1
        }).then((users)=>{
            req.flash('success', 'Data added successfully!');
            res.redirect('/signup');
        }).catch((error)=>{
            req.flash('error', error);
            res.redirect('/signup');
        });

    }
    else {
        var errors_msg = '';
        errors.forEach(function(errors){
            errors_msg += "</p>"+errors.msg+"</p>";
        });
        req.flash('error',errors_msg);
        res.redirect('/signup');
    }

    
});


app.get('/logout',function(req,res){

    req.logout();
    res.redirect('/');

});


}

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/login");
    }
}
