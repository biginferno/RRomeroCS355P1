var mysql = require('mysql');
var db = require ('./db_connection.js');
/*DATABASE CONFIGURATION*/
var connection = mysql.createConnection(db.config);


exports.getQuery1 = function( callback) {
    var query = 'CALL sqlquery1()';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getQuery2 = function( callback) {
    var query = 'CALL sqlquery2()';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getQuery3 = function( callback) {
    var query = 'CALL sqlquery3()';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getQuery4 = function( callback) {
    var query = 'CALL sqlquery4()';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getQuery5 = function( callback) {
    var query = 'CALL sqlquery5()';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getQuery6 = function( callback) {
    var query = 'CALL sqlquery6()';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getQuery7 = function( callback) {
    var query = 'CALL sqlquery7()';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getQuery8 = function( callback) {
    var query = 'CALL sqlquery8()';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getQuery9 = function( callback) {
    var query = 'CALL sqlquery9()';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getQuery10 = function( callback) {
    var query = 'CALL sqlquery10()';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

