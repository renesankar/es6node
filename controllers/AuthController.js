
"use strict";

let db = require('../db');
let User = require('../models/user');
let bcrypt = require('bcrypt');
let jwt = require('jwt-simple');
let moment = require('moment');

module.exports = class AuthController {
    
    authenticate(email, password, req, callback){
         
        const user = new User();
        user.findByEmail(email,function(err, profile){
            
                bcrypt.compare(password, profile.password, function (err, doesMatch) {
                if (doesMatch) {
                    let expires = moment().add(7,'days').valueOf();
                    let token = jwt.encode({
                        iss: profile.profile_id,
                        exp: expires
                    }, req.app.get('jwtTokenSecret'));
                    
                    callback(null, token);
                        
                } else {
                    callback(err, null);
                }
            });
        })
        
    }
    
    getUser(token, req, callback){
        const user = new User();
        if(token){
            let decoded = jwt.decode(token, req.app.get('jwtTokenSecret'));
            let profileId = decoded.iss;
            user.findById(profileId, function(err, profile){
                if (err)
                    return callback(err);
                
                callback(null, profile);
            });
        }
    }
    
};


