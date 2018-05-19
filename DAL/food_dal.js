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
        if(err||params.store_id===undefined){
            console.log(err);
            callback(err,result);
        }
        else{
            var foodID = result.insertId;
            var query1='INSERT INTO store_food(store_id,food_id) VALUES ?';
            var StoreFoodData=[];

            if (params.store_id.constructor === Array){
                for(var i=0; i<params.store_id.length;i++){
                    StoreFoodData.push([params.store_id[i],foodID]);
                }
            }
            else{
                StoreFoodData.push([params.store_id, foodID]);
            }
            connection.query(query1,[StoreFoodData], function (err,result) {
                callback(err,result);
            })
        }

    });
};

exports.delete=function(params,callback){
    var query = 'Call deleteFood(?)';
    var query2='Call deleteStoreFood(?)';

    var queryData = [params.food_id];

    connection.query(query, queryData, function(err,result) {
        connection.query(query2, queryData, function (err, result) {
            callback(err, result);
        })
    })
};

exports.update = function(params,callback) {
    var query = 'UPDATE food SET name = ?,meal_designation=?,meal_type=? ' +
        'WHERE food_id = ?';
    var queryData = [params.name, params.meal_designation,params.meal_type,params.food_id];
    connection.query(query, queryData, function(err,result){
        if(err||params.store_id===undefined){
            console.log(err);
            callback(err,result);
        }
        else{
            var foodID = params.food_id;

            var query1='INSERT INTO store_food(store_id,food_id) VALUES ?';
            var query2='Call deleteStoreFood(?)';
            var queryDataDelete = [params.food_id];

            var StoreFoodData=[];

            if (params.store_id.constructor === Array){
                for(var i=0; i<params.store_id.length;i++){
                    StoreFoodData.push([params.store_id[i], foodID]);
                }
            }
            else{
                StoreFoodData.push([params.store_id, foodID]);
            }
            connection.query(query1,[StoreFoodData], function (err,result) {
                connection.query(query2, queryDataDelete, function(err,result){
                        callback(err,result);
                })
            })
        }

    });
};



