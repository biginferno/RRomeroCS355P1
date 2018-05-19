var mysql = require('mysql');
var db = require ('./db_connection.js');

/*DATABASE CONFIGURATION*/
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM region;';

    connection.query(query, function(err,result) {
        callback(err, result);

    });
};

exports.getInfo = function(region_id, callback) {
    var query = 'CALL region_getinfo(?)';
    var queryData = [region_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params,callback){
    var query = 'CALL region_insert(?,?,?)';

    var queryData = [params.name, params.growing_seasons, params.country];

    connection.query(query, queryData, function(err,result){
        callback(err,result);
    });
};



exports.update = function(params,callback) {
    var query = 'UPDATE region SET name = ?, growing_seasons = ?, country = ? ' +
        'WHERE region_id = ?';
    var queryData = [params.name, params.growing_seasons, params.country, params.region_id];

    connection.query(query, queryData, function(err,result){
        callback(err,result);
    });
};

exports.delete=function(params,callback){
    var query = 'Call deleteRegion(?)';
    var query2='Call deleteWineryRegion(?)';

    var queryData = [params.region_id];

    connection.query(query, queryData, function(err,result) {
        connection.query(query2, queryData, function (err, result) {
            callback(err, result);
        })
    })
};