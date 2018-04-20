var express = require('express');
var router = express.Router();
var store_dal = require('../dal/store_dal');
var addressWD_dal=require('../dal/addressWD_dal');
/* GET users listing. */
router.get('/all',function(req,res,next){
    store_dal.getAll(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('store/store_view_all', {store:result});
        }
    })

});

router.get('/add',function(req,res) {

    addressWD_dal.getAll(function(err,result) {
        if(err){
            res.send(err);
        }
        else {
            res.render('store/store_add',{addressWD_result:result[0]});
        }
    });

});

router.get('/insert', function(req,res){
    store_dal.insert(req.query,function(err,result){
        if(err) {
            console.log(err);
            res.send(err);
        }
        else{
            res.redirect(302,'/store/all');
        }
    });
});

router.get('/edit', function(req,res){
    store_dal.getInfo(req.query.store_id,function(err,result){
        if(err) {res.send(err); }
        else{
            res.render('store/store_update',
                {store:result[0][0]}
            );
        }
    });
});


router.get('/update', function(req, res) {
    store_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/store/all');
        }
    });
});

module.exports=router;