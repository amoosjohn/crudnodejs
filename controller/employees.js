const Employees = require('../models/').employees;
var middleware = require('../middleware');

console.log(middleware);
module.exports = function (app) {

app.get('/dashboard',checkAuthentication, function(req, res,next) {
    // render to views/index.ejs template file
    req.session.username = req.user.name;
    res.render('dashboard',{title:'Dashboard',username:req.user.name});
    
});

app.get('/employee',checkAuthentication,function(req, res,next) {
    // render to views/index.ejs template file

    Employees.findAll({limit: 10,
        order: [
            ['id', 'DESC'],
            ['createdAt', 'DESC']
        ]}).then((employees)=>{
        res.render('employees/index',{data:employees,title:'Employee'});
    })
    
});


app.get('/employee/create', function(req, res,next) {
    // render to views/index.ejs template file

     res.render('employees/create',{title:'Add Employee',
     name:'',
     age:'',
     email:'',
 });
    
});

app.post('/employee/add', function(req, res) {
    
    

    Employees.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address
    }).then((employees)=>{
        req.flash('success', 'Data added successfully!')
        res.redirect('/employee');
    }).catch((error)=>{
        req.flash('error', error)
        res.render('employees/create',{title:'Add Employee',
        name:'',
        age:'',
        email:'',
        });
    });
});


app.get('/employee/edit/(:id)', function(req, res,next) {
    // render to views/index.ejs template file
     Employees.findOne({
         where:{
             id:req.params.id
         }
     }).then((data)=>{
        res.render('employees/edit',{title:'Edit Employee',
            id:data.id,
            name:data.name,
            address:data.address,
            email:data.email,
            phone:data.phone
        });
     }); 
     
    
});


app.put('/employee/edit/(:id)', function(req, res) {

    Employees.update({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address
    },{
    where:{
        id:req.params.id
    }
    }).then((employees)=>{
        req.flash('success', 'Data updated successfully!')
        res.redirect('/employee');
    }).catch((error)=>{
        req.flash('error', error)
        res.redirect('/employee/edit/'+req.params.id);
    });
});


app.get('/employee/delete/(:id)', function(req, res,next) {
    // render to views/index.ejs template file
     Employees.destroy({
         where:{
             id:req.params.id
         }
     }).then((data)=>{
        req.flash('success', 'Data deleted successfully!')
        res.redirect('/employee');
     }); 
     
    
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
