"use strict";

var db = require('../db');

module.exports =  class User1s{
    
   constructor(profileId, email, firstName, lastName, password){
       this.profileId = profileId;
       this.email = email;
       this.firstName = firstName;
       this.lastName = lastName;
       this.password = password;
   }

   insertIntoDb(reqObj,hash_password,hash_email,res,callback){

    let insertSql = "INSERT INTO users SET ?";
                let insertValues = {
                    "profile_id": hash_email,
                    "first_name": reqObj.first_name,
                    "last_name": reqObj.last_name,
                    "email": reqObj.email,
                    "phone": reqObj.phone,
                    "password": hash_password,
                    "type_id": reqObj.type_id
                };
                db.query(insertSql, insertValues, function(err, result) {
                     if (err)
                return callback(err);
            
            callback(null, result[0])


                });  
   }


  
   findById(profileId, callback){
       
        db.query('SELECT profile_id, first_name, last_name, email, password FROM users WHERE profile_id = ?', [profileId], function (err, result, fields) {
            if (err)
                return callback(err);
            
            callback(null, result[0])
        });
   }
   
   findByEmail(email, callback){
       
        db.query('SELECT profile_id, first_name, last_name, email, password FROM users WHERE email = ?', [email], function (err, result, fields) {
            if (err)
                return callback(err);
            
            callback(null, result[0])
        });    
   }
   
   save(callback){
       
   }
   
   
    
}





