var express = require('express')
var app = express()
 
app.get('/', function(req, res,next) {
    // render to views/index.ejs template file

    req.getConnection(function(error,conn){
        conn.query('SELECT * FROM users ORDER BY id DESC',function(err,rows,fields)
        {   
            if (err) {
                req.flash('error', err)
                res.render('users/list', {
                    title: 'User List', 
                    data: ''
                })
            }
            else{
                console.log(rows)
                //return false;
                res.render('users/list',{title:'User List',data:rows});
            }
            
        })
        
    })
    
})
app.get('/add', function(req, res,next) {
    // render to views/index.ejs template file
    res.render('users/add',{title:'Add User',
    name:'',
    age:'',
    email:'',
});

    
}) 
app.post('/add', function(req, res,next) {
    // render to views/index.ejs template file
    var input = JSON.parse(JSON.stringify(req.body));
    var user = {
        name:input.name,
        age:input.age,
        email:input.email,
    };
    req.getConnection(function(error,conn){
        conn.query("INSERT INTO `users` set ?",user,function(err,result)
        {   
            if (err) {
                req.flash('error', err)
                res.render('users/add', {
                    title: 'Add New User',
                    name: user.name,
                    age: user.age,
                    email: user.email                    
                })
            }
            else{
                req.flash('success', 'Data added successfully!')
                //return false;
                res.render('users/add',{title:'Add User',
                name:'',
                age:'',
                email:'',            
                })
            }
            
        })
        
    })
   
});

/** 
 * We assign app object to module.exports
 * 
 * module.exports exposes the app object as a module
 * 
 * module.exports should be used to return the object 
 * when this file is required in another module like app.js
 */ 
module.exports = app;