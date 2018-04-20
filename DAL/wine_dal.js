var mysql = require('mysql');
var db = require ('./db_connection.js');

/*DATABASE CONFIGURATION*/
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM wine;';

    connection.query(query, function(err,result) {
        callback(err, result);

    });
};

exports.getInfo = function(wine_id, callback) {
    var query = 'CALL wine_getinfo(?)';
    var queryData = [wine_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params,callback){
    var query = 'INSERT INTO wine (name,color,varietals,ABV,year,winery_id) ' +
        'VALUES (?,?,?,?,?,?)';

    var queryData = [params.name, params.color, params.varietals,params.ABV, params.year,params.winery_id];

    connection.query(query, queryData, function(err,result){
        callback(err,result);
    });
};



exports.update = function(params,callback) {
    var query = 'UPDATE wine SET name = ?,color=?,varietals=?,ABV=?,year=?'+
        'WHERE wine_id = ?';
    var queryData = [params.name, params.color, params.varietals,params.ABV, params.year];

    connection.query(query, queryData, function(err,result) {
        callback(err, result);
    });
};