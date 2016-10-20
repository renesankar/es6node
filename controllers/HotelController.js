"use strict";
let db = require('../db');
let Hotel = require('../models/hotel.js');
let bcrypt = require('bcrypt');
let jwt = require('jwt-simple');
let moment = require('moment');

module.exports = class HotelController {

	create(reqObj, res, req, callback) {

        let name = reqObj.name;
        let description = reqObj.description;
        const hotel = new Hotel(name,description);
        
        hotel.createHotel(res,function(err,result) {
            if(err) {
                return callback(err);
            }
            res.send("New hotel registerd");
        });
    }

    imageUpload(hotel_id,reqObj, res, req, callback) {

    	// res.send(reqObj);
        const hotel = new Hotel();
        hotel.uploadImage(hotel_id,reqObj,res,function(err,result) {
            if(err) {
                return callback(err);
            }
             res.send("image uploaded");
        });
    }
};