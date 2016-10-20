"use strict";

var db = require('../db');

module.exports =  class User1s {

   constructor(profileId,firstName,lastName,email,password,phone,type_id){
       this.profileId = profileId;
       this.firstName = firstName;
       this.lastName =  lastName;
       this.email = email;
       this.password = password;
       this.phone = phone;
       this.type_id = type_id;      
   }
 
insertIntoDb(res,callback) {

     let insertSql = "INSERT INTO users SET ?";
                let insertValues = {
                    "profile_id": this.profileId,
                    "first_name": this.firstName,
                    "last_name": this.lastName,
                    "email": this.email,
                    "phone": this.phone,
                    "password": this.password,
                    "type_id": this.type_id
                };
                db.query(insertSql, insertValues, function(err, result) {
                     if (err)
                return callback(err);
                callback(null, result[0])

                });  
   }

   findById(profileId, callback) {
       
        db.query('SELECT profile_id, first_name, last_name, email, password FROM users WHERE profile_id = ?', [profileId], function (err, result, fields) {
            if (err)
                return callback(err);
            
            callback(null, result[0])
        });
   }
   
   findByEmail(email, callback) {
       
        db.query('SELECT profile_id, first_name, last_name, email, password FROM users WHERE email = ?', [email], function (err, result, fields) {
            if (err)
                return callback(err);
            
            callback(null, result[0])
        });    
   }
   
   save(callback) {
       
   }    
}





