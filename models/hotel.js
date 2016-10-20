"use strict";

var db = require('../db');

module.exports =  class User1s {

   constructor(name,description) {
       this.hotel_name = name;
       this.description1 = description;   
   }
 
createHotel(res,callback) {

     let insertSql = "INSERT INTO hotels SET ?";
                let insertValues = {
                    "hotel_name":this.hotel_name,
                    "description":this.description1,
                    "created_at":"DATE()"
                };

                db.query(insertSql, insertValues, function(err, result) {
                     if (err)
                return callback(err);
                callback(null, result[0])
                });  
   }
   

uploadImage(hotel_id,reqObj,res,callback) {

     let originalname = reqObj[0].originalname.split('.');
     let insertSql = "INSERT INTO hotel_images SET ?";
                let insertValues = {
                    "filename": originalname[0],
                    "mime": originalname[1],
                    "original_filename": reqObj[0].filename,
                    "hotel_id": hotel_id,
                    "created_at":"NOW()"
                };

                db.query(insertSql, insertValues, function(err, result) {
                     if (err)
                return callback(err);
                callback(null, result[0])
                });  
   }

   save(callback) {
       
   }    
}

