var express = require('express');
var router = express.Router();
var addressWD_dal = require('../DAL/addressWD_dal');

/* GET users listing. */
router.get('/all',function(req,res,next){
    addressWD_dal.getAll(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('address/addressWD_view_all', {addressWD:result});
        }
    })

});

router.get('/add',function(req,res) {
    res.render('address/addressWD_add');
});

router.get('/insert', function(req,res){
    addressWD_dal.insert(req.query,function(err,result){
        if(err) {
            console.log(err);
            res.send(err);
        }
        else{
            res.redirect(302,'/addressWD/all');
        }
    });
});

router.get('/edit', function(req,res){
    addressWD_dal.getInfo(req.query.addressWD_id,function(err,result){
        if(err) {res.send(err);}
        else{
            res.render('address/addressWDUpdate',
                {addressWD:result[0]}
            );
        }
    });
});


router.get('/update', function(req, res) {
    addressWD_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/addressWD/all');
        }
    });
});

module.exports=router;