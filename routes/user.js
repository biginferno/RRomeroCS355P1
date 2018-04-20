var express = require('express');
var router = express.Router();
var user_dal = require('../DAL/user_dal');

/* GET users listing. */
router.get('/all',function(req,res,next){
    user_dal.getAll(function(err,result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('users/users_view_all', {user:result});
        }
    })

});

router.get('/add',function(req,res) {
    res.render('users/users_add');
});

router.get('/insert', function(req,res){
    user_dal.insert(req.query,function(err,result){
        if(err) {
            console.log(err);
            res.send(err);
        }
        else{
            res.redirect(302,'/user/all');
        }
    });
});

router.get('/edit', function(req,res){
    user_dal.getInfo(req.query.user_id,function(err,result){
        if(err) {res.send(err); }
        else{
            res.render('users/users_update',
                {user:result[0][0]}
            );
        }
    });
});


router.get('/update', function(req, res) {
    user_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/user/all');
        }
    });
});

module.exports=router;
