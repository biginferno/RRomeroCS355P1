var mysql = require('mysql');
var db = require ('./db_connection.js');
/*DATABASE CONFIGURATION*/
var connection = mysql.createConnection(db.config);
exports.getAll = function(callback) {
    var query = 'SELECT * FROM food;';
    connection.query(query, function(err,result) {
        callback(err, result);
    });
};
exports.getInfo = function(food_id, callback) {
    var query = 'CALL food_getinfo(?)';
    var queryData = [food_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
exports.insert = function(params,callback){
    var query = 'INSERT INTO food (name,meal_designation,meal_type) ' +
        'VALUES (?,?,?)';
    var queryData = [params.name, params.meal_designation,params.meal_type];
    connection.query(query, queryData, function(err,result){
        callback(err,result);
    });
};
exports.update = function(params,callback) {
    var query = 'UPDATE food SET name = ?,meal_designation=?,meal_type=? ' +
        'WHERE food_id = ?';
    var queryData = [params.name, params.meal_designation,params.meal_type,params.food_id];
    connection.query(query, queryData, function(err,result) {
        callback(err, result);
    });
};