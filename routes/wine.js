var express = require('express');
var router = express.Router();
var wine_dal = require('../dal/wine_dal');
var winery_dal = require('../dal/winery_dal');
/* GET users listing. */
router.get('/all',function(req,res,next){
    wine_dal.getAll(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('wine/wine_view_all', {wine:result});
        }
    })
});
router.get('/add',function(req,res,next){
    winery_dal.getAll(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('wine/wine_add', {winery_result:result});
        }
    })
});
router.get('/insert', function(req,res){
    wine_dal.insert(req.query,function(err,result){
        if(err) {
            console.log(err);
            res.send(err);
        }
        else{
            res.redirect(302,'/wine/all');
        }
    });
});
router.get('/edit', function(req,res){
    wine_dal.getInfo(req.query.wine_id,function(err,result){
        if(err) {res.send(err); }
        else{
            res.render('wine/wine_update',
                {wine:result[0][0]}
            );
        }
    });
});
router.get('/update', function(req, res) {
    wine_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/wine/all');
        }
    });
});

module.exports=router;