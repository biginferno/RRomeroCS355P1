var mysql = require('mysql');
var db = require ('./db_connection.js');

/*DATABASE CONFIGURATION*/
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM store;';

    connection.query(query, function(err,result) {
        callback(err, result);

    });
};

exports.getInfo = function(store_id, callback) {
    var query = 'CALL store_getinfo(?)';
    var queryData = [store_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params,callback){
    var query = 'INSERT INTO store (name,specialty) ' +
        'VALUES (?,?)';

    var queryData = [params.name, params.specialty];

    connection.query(query, queryData, function(err,result){
        callback(err,result);
    });
};

var storeAddressWDInsert = function(store_id, addressWDIdArray, callback)
{ //NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
    var query = 'INSERT INTO store_addressWD (store_id, addressWD_id)' +
        'VALUES ?';
    //TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF VALUES
    var storeAddressWDData = [];

    if (addressWDIdArray.constructor === Array){
        for(var i = 0; i<addressWDIdArray.length; i++) {
            storeAddressWDData.push([store_id, addressWDIdArray[i]]);
        }
    }
    else {
        storeAddressWDData.push([store_id, addressWDIdArray]);
    }
    connection.query(query, [storeAddressWDData], function(err, result){
        callback(err, result);
    });
};

exports.update = function(params,callback) {
    var query = 'UPDATE store SET name = ?,specialty = ?' +
        'WHERE store_id = ?';
    var queryData = [params.name, params.specialty,params.store_id];

    connection.query(query, queryData, function(err,result){
        callback(err,result);
    });
};