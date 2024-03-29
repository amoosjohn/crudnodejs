const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
var config = require('./../config');
const db = {}

var sequelize = new Sequelize(config.dbUrl, {
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false 
});
// var sequelize = new Sequelize(config.database.db, config.database.user,  config.database.password, {
//   host: 'localhost',
//   dialect: 'mysql',

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },


//   // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
//   operatorsAliases: false
// });

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db