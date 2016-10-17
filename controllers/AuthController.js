
"use strict";

let db = require('../db');
let User = require('../models/user');
let bcrypt = require('bcrypt');
let jwt = require('jwt-simple');
let moment = require('moment');

module.exports = class AuthController {

    authenticate(email, password, req, callback) {

        let salt = bcrypt.genSaltSync(10);
        let profileId = bcrypt.hashSync(email,salt);
        const user = new User();
        user.findByEmail(email,function(err, profile) {

                bcrypt.compare(password, profile.password, function (err, doesMatch) {
                 if(err) {
                    // res.send(err);
                     return callback(err);
                }
             else {
               let token=getAuthToken(profile,req,callback);
                callback(null, token);
             }  
                
            });
        })    
    }
    
    getUser(token, req, callback) {
        const user = new User();
        if(token){
            let decoded = jwt.decode(token, req.app.get('jwtTokenSecret'));
            let profileId = decoded.iss;
            console.log(profileId);
            user.findById(profileId, function(err, profile) {
                if (err)
                    return callback(err);
                
                callback(null, profile);
            });
        }
    }
    
};

/*token generation*/
function getAuthToken(profile,req,callback) {
    let expires = moment().add(7,'days').valueOf();
                    let token = jwt.encode({
                        iss: profile.profile_id,
                        exp: expires
                    }, req.app.get('jwtTokenSecret'));
                    return token;
                  // callback(null, token);
                 
}




