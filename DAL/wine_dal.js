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
        if(err||params.store_id===undefined){
            console.log(err);
            callback(err,result);
        }
        else{
            var wineID = result.insertId;
            var query1='INSERT INTO store_wine(store_id,wine_id) VALUES ?';

            var storewinedata=[];
            if (params.store_id.constructor === Array){
                for(var i=0; i<params.store_id.length;i++){
                    storewinedata.push([params.store_id[i],wineID]);
                }
            }
            else{
                storewinedata.push([params.store_id, wineID]);
            }
            connection.query(query1,[storewinedata], function (err,result) {
                callback(err,result);
            })
        }

    });
};



exports.update = function(params,callback) {
    var query = 'UPDATE wine SET name = ?,color=?,varietals=?,ABV=?,year=?, winery_id=? '+
        'WHERE wine_id = ?';
    var queryData = [params.name, params.color, params.varietals,params.ABV, params.year,params.winery_id,params.wine_id];

    connection.query(query, queryData, function(err,result){
        if(err||params.store_id===undefined){
            console.log(err);
            callback(err,result);
        }
        else{
            var wineID = [params.wine_id];

            var query1='INSERT INTO store_wine(store_id,wine_id) VALUES ?';
            var query2='Call deleteStoreWine(?)';
            var queryDataDelete = [params.wine_id];

            var StoreWineData=[];

            if (params.store_id.constructor === Array){
                for(var i=0; i<params.store_id.length;i++){
                    StoreWineData.push([params.store_id[i], wineID]);
                }
            }
            else{
                StoreWineData.push(params.store_id, wineID);
            }
            connection.query(query1,[StoreWineData], function (err,result) {
                connection.query(query2, queryDataDelete, function(err,result){
                    callback(err,result);
                })
            })
        }

    });
};

exports.delete=function(params,callback){
    var query = 'Call deleteWine(?)';
    var query2='Call deleteWineUser(?)';
    var query3='Call deleteStoreWine(?)';

    var queryData = [params.wine_id];

    connection.query(query, queryData, function(err,result) {
        connection.query(query2, queryData, function (err, result) {
            connection.query(query3, queryData, function (err, result) {
                callback(err, result);
            })
        })
    })
};