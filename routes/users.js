 "use strict";

let express = require('express');
let router = express.Router();
let AuthController  = require('../controllers/AuthController');

router.post('/create', function (req, res, next) {
    
    if (req.method == 'POST') {
        let reqObj= req.body;
        // res.json(reqObj);
        const auth = new AuthController();
        // auth.print();
       auth.create(reqObj,res,req, function(err, token){
            if(err){
                 res.status(400).json("Invalid request");
            }
            res.status(200).json(token);
        });


    }
});


router.post('/authenticate', function (req, res, next) {
    
    if (req.method == 'POST') {
        let email = req.body.email;
        let password = req.body.password;
        // res.send(req.body.password);
        const auth = new AuthController();
        // auth.print();
       auth.authenticate(email, password, req, function(err, token){
            if(err){
                 res.status(400).json("Invalid request");
            }
            res.status(200).json(token);
        });


    }
});

router.post('/token', function (req, res, next) {
    
    if (req.method == 'POST') {
        const auth = new AuthController();
        let token = req.headers.authorization;
        if(token){
            auth.getUser(token, req, function(err, profile){
                if(err){
                    res.status(400).json("Invalid request");
                }
                res.status(200).json(profile);
            });
        }
    }
});

module.exports = router;
