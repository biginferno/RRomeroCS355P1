var mysql = require('mysql');
var db = require ('./db_connection.js');
/*DATABASE CONFIGURATION*/
var connection = mysql.createConnection(db.config);
exports.getAll = function(callback) {
    var query = 'SELECT * FROM user;';
    connection.query(query, function(err,result) {
        callback(err, result);
    });
};
exports.getInfo = function(user_id, callback) {
    var query = 'CALL user_getinfo(?)';
    var queryData = [user_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
exports.insert = function(params,callback){
    var query = 'INSERT INTO user (first_name,last_name,sex,age,day,month,year,wine_preference,food_preference,email) ' +
                'VALUES (?,?,?,?,?,?,?,?,?,?)';

    var queryData = [params.first_name,params.last_name, params.sex, params.age,params.day, params.month,params.year,params.wine_preference,
        params.food_preference, params.email];
    connection.query(query, queryData, function(err,result){
        callback(err,result);
    });
};
exports.update = function(params,callback) {
    var query = 'UPDATE user SET first_name = ?,last_name=? sex = ?, age = ?,day = ?, month = ?, year = ?,wine_prefence=?,food_preference=? email = ?' +
                'WHERE user_id = ?';
    var queryData = [params.first_name,params.last_name, params.sex, params.age,params.day, params.month,params.year,params.wine_preference,
        params.food_preference, params.email,params.user_id];
    connection.query(query, queryData, function(err,result){
        callback(err,result);
    });
};


