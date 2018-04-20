var express = require('express');
var router = express.Router();
var region_dal = require('../dal/region_dal');

/* GET users listing. */
router.get('/all',function(req,res,next){
    region_dal.getAll(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('region/region_view_all', {region:result});
        }
    })

});

router.get('/add',function(req,res) {
    res.render('region/region_add');
});

router.get('/insert', function(req,res){
    region_dal.insert(req.query,function(err,result){
        if(err) {
            console.log(err);
            res.send(err);
        }
        else{
            res.redirect(302,'/region/all');
        }
    });
});

router.get('/edit', function(req,res){
    region_dal.getInfo(req.query.region_id,function(err,result){
        if(err) {res.send(err); }
        else{
            res.render('region/region_update',
                {region:result[0][0]}
            );
        }
    });
});


router.get('/update', function(req, res) {
    region_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/region/all');
        }
    });
});

module.exports=router;