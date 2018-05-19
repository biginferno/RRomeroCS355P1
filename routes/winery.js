var express = require('express');
var router = express.Router();
var winery_dal = require('../dal/winery_dal');
var region_dal = require('../dal/region_dal');
/* GET users listing. */
router.get('/all',function(req,res,next){
    winery_dal.getAll(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('winery/winery_view_all', {winery:result});
        }
    })

});

router.get('/add',function(req,res,next){
    region_dal.getAll(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('winery/winery_add', {region_result:result});
        }
    })
});

router.get('/insert', function(req,res){
    winery_dal.insert(req.query,function(err,result){
        if(err) {
            console.log(err);
            res.send(err);
        }
        else{
            res.redirect(302,'/winery/all');
        }
    });
});

router.get('/edit', function(req,res){
    winery_dal.getInfo(req.query.winery_id,function(err,result){
        if(err) {res.send(err); }
        else{
            res.render('winery/winery_update',
                {winery:result[0][0], region:result[1]}
            );
        }
    });
});


router.get('/update', function(req, res) {
    winery_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/winery/all');
        }
    });
});

router.get('/delete', function(req, res) {
    winery_dal.delete(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/winery/all');
        }
    });
});



module.exports=router;