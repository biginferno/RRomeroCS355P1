var express = require('express');
var router = express.Router();
var food_dal = require('../dal/food_dal');

/* GET users listing. */
router.get('/all',function(req,res,next){
    food_dal.getAll(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('food/food_view_all', {food:result});
        }
    })

});

router.get('/add',function(req,res) {
    res.render('food/food_add');
});

router.get('/insert', function(req,res){
    food_dal.insert(req.query,function(err,result){
        if(err) {
            console.log(err);
            res.send(err);
        }
        else{
            res.redirect(302,'/food/all');
        }
    });
});

router.get('/edit', function(req,res){
    food_dal.getInfo(req.query.food_id,function(err,result){
        if(err) {res.send(err); }
        else{
            res.render('food/foodUpdate',
                {food:result[0][0]}
            );
        }
    });
});


router.get('/update', function(req, res) {
    food_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/food/all');
        }
    });
});

module.exports=router;