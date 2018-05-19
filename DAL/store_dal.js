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
    var query = 'INSERT INTO store (name,specialty) VALUES (?,?)';

    var queryData = [params.name, params.specialty];

    connection.query(query, queryData, function(err,result){
        if(err||params.addressWD_id===undefined){
            console.log(err);
            callback(err,result);
        }
        else{
            var storeID = result.insertId;
            var query1='INSERT INTO store_addressWD(store_id, addressWD_id) VALUES ?';
            var StoreAddressData=[];
            if (params.addressWD_id.constructor === Array){
                for(var i=0; i<params.addressWD_id.length;i++){
                    StoreAddressData.push([storeID,params.addressWD_id[i]]);
                }
            }
            else{
                StoreAddressData.push([storeID, params.addressWD_id]);
            }
            connection.query(query1,[StoreAddressData], function (err,result) {
                callback(err,result);
            })
        }

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

exports.delete=function(params,callback){
    var query = 'Call deleteStore(?)';
    var query2='Call deleteStoreFood(?)';
    var query3='Call deleteStoreWine(?)';

    var queryData = [params.store_id];

    connection.query(query, queryData, function(err,result) {
        connection.query(query2, queryData, function (err, result) {
            connection.query(query3, queryData, function (err, result) {
                callback(err, result);
            })
        })
    })
};