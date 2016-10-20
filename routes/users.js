 "use strict";

let express = require('express');
let router = express.Router();
let multer = require('multer');
let validator = require('validator');
let upload = multer({ dest: 'C:/Users/MSI0730/trip/es6node/public/uploads/'});
let AuthController  = require('../controllers/AuthController');
let userController  = require('../controllers/userController');
let HotelController  = require('../controllers/HotelController');

router.post('/create', function (req, res, next) {
    
    if (req.method == 'POST') {
        let reqObj = req.body;
        const user = new userController();
        // auth.print();
       user.create(reqObj,res,req, function(err, token) {
            if(err) {
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
        const auth = new AuthController();
        // auth.print();
       auth.authenticate(email, password, req, function(err, token) {
            if(err) {
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
        if(token) {
            auth.getUser(token, req, function(err, profile) {
                if(err) {
                    res.status(400).json("Invalid request");
                }
                // res.status(200).json(profile);
                res.json(profile);
            });
        }
    }
});

/*register new hotel*/
router.post('/registerhotel', function (req, res, next) {
    
    if (req.method == 'POST') {
        let reqObj = req.body;
        // res.json(reqObj);
         const Hotel = new HotelController();
       Hotel.create(reqObj,res,req, function(err, res) {
            if(err) {
                 res.status(400).json("Invalid request");
            }
        });
    }
});

/*upload hotel image*/
router.post('/hotelImage/:id',upload.any(),function (req, res, next) {
    
    if (req.method == 'POST') {

        let hotel_id = req.params.id;
        let reqObj = req.files;
        const Hotel = new HotelController();
        Hotel.imageUpload(hotel_id,reqObj,res,req, function(err, res) {
            if(err) {
                 res.status(400).json("Invalid request");
            }
        });
    }
});

module.exports = router;
