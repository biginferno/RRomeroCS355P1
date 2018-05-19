var mysql = require('mysql');
var db = require ('./db_connection.js');
/*DATABASE CONFIGURATION*/
var connection = mysql.createConnection(db.config);
exports.getAll = function(callback) {
    var query = 'SELECT * FROM addressWD;';
    connection.query(query, function(err,result) {
        callback(err, result);
    });
};
exports.getInfo = function(addressWD_id, callback) {
    var query = 'CALL addressWD_getinfo(?)';
    var queryData = [addressWD_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
exports.insert = function(params,callback){
    var query = 'INSERT INTO addressWD (street,city,state,country,zip_code) ' +
        'VALUES (?,?,?,?,?)';
    var queryData = [params.street, params.city,params.state,params.country,params.zip_code];
    connection.query(query, queryData, function(err,result){
        callback(err,result);
    });
};
exports.update = function(params,callback) {
    var query = 'UPDATE addressWD SET street = ?, city=?, state=?, country=?, zip_code=? WHERE addressWD_id = ?';

    var queryData = [params.street, params.city, params.state, params.country, params.zip_code, params.addressWD_id];

    connection.query(query, queryData, function(err,result) {
        callback(err, result);
    });
};

exports.delete=function(params,callback){
    var query = 'Call deleteAddressWD(?)';
    var query2='Call deleteStoreAddressWD(?)';
    // var query3='Call deleteWineryAddressWD(?)';

    var queryData = [params.addressWD_id];

    connection.query(query, queryData, function(err,result) {
        connection.query(query2, queryData, function (err, result) {
            callback(err, result);
        })
    })
};

