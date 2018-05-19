var express = require('express');
var router = express.Router();
var subqueries_dal = require('../dal/subqueries_dal');

router.get('/allsq1',function(req,res,next){
    subqueries_dal.getQuery1(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/subquery1', {query1:result[0]});
        }
    })
});

router.get('/allsq2',function(req,res,next){
    subqueries_dal.getQuery2(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/subquery2', {query2:result[0]});
        }
    })
});

router.get('/allsq3',function(req,res,next){
    subqueries_dal.getQuery3(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/subquery3', {query3:result[0]});
        }
    })
});

router.get('/allsq4',function(req,res,next){
    subqueries_dal.getQuery4(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/subquery4', {query4:result[0]});
        }
    })
});

router.get('/allsq5',function(req,res,next){
    subqueries_dal.getQuery5(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/subquery5', {query5:result[0]});
        }
    })
});

router.get('/allsq6',function(req,res,next){
    subqueries_dal.getQuery6(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/subquery6', {query6:result[0]});
        }
    })
});

router.get('/allsq7',function(req,res,next){
    subqueries_dal.getQuery7(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/subquery7', {query7:result[0]});
        }
    })
});

router.get('/allsq8',function(req,res,next){
    subqueries_dal.getQuery8(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/subquery8', {query8:result[0]});
        }
    })
});

router.get('/allsq9',function(req,res,next){
    subqueries_dal.getQuery9(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/subquery9', {query9:result[0]});
        }
    })
});

router.get('/allsq10',function(req,res,next){
    subqueries_dal.getQuery10(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/subquery10', {query10:result[0]});
        }
    })
});

module.exports=router;