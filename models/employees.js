
module.exports = function(sequelize,DataTypes) {
    var Employees = sequelize.define('employees',{
        name:DataTypes.STRING,
        email:DataTypes.STRING,
        phone:DataTypes.STRING,
        address:DataTypes.STRING,
    },{
    classMethod:{
        associated:function(model){

            }
        }
    });
    return Employees;
}