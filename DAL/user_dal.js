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
        if(err||params.wine_id===undefined || params.food_id===undefined){
            console.log(err);
            callback(err,result);
        }
        else{
            var userID = result.insertId;
            var query1='INSERT INTO user_food(food_id,user_id) VALUES ?';
            var query2='INSERT INTO user_wine(wine_id,user_id) VALUES ?';
            var UserFoodData=[];
            var UserWineData=[];




            if (params.food_id.constructor === Array){
                for(var i=0; i<params.food_id.length;i++){
                    UserFoodData.push([params.food_id[i],userID]);
                }
            }
            else {
                UserFoodData.push(params.food_id, userID);
            }





            if (params.wine_id.constructor === Array){
                for(var i=0; i<params.wine_id.length;i++){
                    UserWineData.push([params.wine_id[i],userID]);
                }
            }
            else{
                UserWineData.push(params.wine_id, userID);
            }
            connection.query(query1,[UserFoodData], function (err,result) {
                connection.query(query2,[UserWineData], function(err,result) {

                        callback(err, result);

                })
            })

        }
    });
};
exports.update = function(params,callback) {
    var query = 'UPDATE user SET first_name = ?, last_name=?, sex = ?, age = ?,day = ?, month = ?, year = ?,wine_preference=?,food_preference=?, email = ? WHERE user_id = ?';

    var queryData = [params.first_name,params.last_name, params.sex, params.age,params.day, params.month,params.year,params.wine_preference,
        params.food_preference, params.email,params.user_id];
    connection.query(query, queryData, function(err,result){
        callback(err,result);
    });
};

exports.delete=function(params,callback){
    var query = 'Call deleteUser(?)';
    var query2='Call deleteUserFood(?)';
    var query3='Call deleteUserWine(?)';

    var queryData = [params.user_id];

    connection.query(query, queryData, function(err,result) {
        connection.query(query2, queryData, function (err, result) {
            connection.query(query3, queryData, function (err, result) {
                callback(err, result);
            })
        })
    })
};


