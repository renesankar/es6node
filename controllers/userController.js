/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 "use strict";
let db = require('../db');
let User = require('../models/user');
let bcrypt = require('bcrypt');
let jwt = require('jwt-simple');
let moment = require('moment');

module.exports = class userController {

/*register new user*/
create(reqObj, res, req, callback) {
         
        let salt = bcrypt.genSaltSync(10);
        let profileId = bcrypt.hashSync(reqObj.email,salt);
        let firstName = reqObj.first_name;
        let lastName = reqObj.last_name;
        let email = reqObj.email;
        let password = bcrypt.hashSync(reqObj.password,salt);
        let phone=reqObj.phone;
        let type_id=reqObj.type_id;

       const user = new User(profileId,firstName,lastName,email,password,phone,type_id);
        
        user.insertIntoDb(res,function(err,result) {
            if(err) {
                // res.send(err);
                return callback(err);
            }
             else {
               let token=getCreateToken(profileId,req,callback);
                callback(null, token);
            }  
        });
    }
 };

/*token generation*/
function getCreateToken(profile,req,callback) {
    let expires = moment().add(7,'days').valueOf();
                    let token = jwt.encode({
                        iss: profile,
                        exp: expires
                    }, req.app.get('jwtTokenSecret'));
                    return token;
                 // callback(null, token);
}


