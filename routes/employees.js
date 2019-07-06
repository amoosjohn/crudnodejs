var express = require('express')
var router = express.Router();

var Employees = require('../models/employees').Employees;

router.get('/', function(req, res,next) {
    // render to views/index.ejs template file

    Employees.findAll().then((employees)=>{
        res.render('employee/index',{data:employees});
    })
    
});


router.get('/create', function(req, res,next) {
    // render to views/index.ejs template file

     res.render('employees/create',{title:'Add Employee',
     name:'',
     age:'',
     email:'',
 });
    
});

router.post('/add', function(req, res) {

    Employees.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address
    }).then((employees)=>{
        req.flash('success', 'Data added successfully!')
        res.render('employee/index',{title:'Employee'
        });
    }).catch((error)=>{
        req.flash('error', error)
        res.render('employee/create',{title:'Add Employee',
        name:'',
        age:'',
        email:'',
        });
    });
});




/** 
 * We assign app object to module.exports
 * 
 * module.exports exposes the app object as a module
 * 
 * module.exports should be used to return the object 
 * when this file is required in another module like app.js
 */ 
module.exports = router;