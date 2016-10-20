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
let validator = require('validator');

module.exports = class userController {

/*register new user*/
create(reqObj, res, req, callback) {

	let errorobj = inputValidation(reqObj);
	let errorobj1 = JSON.stringify(errorobj);

	 // var count = errorobj.keys().length;
  // console.log(count);

	if(errorobj1.length == 2) {

        let salt = bcrypt.genSaltSync(10);
        let profileId = bcrypt.hashSync(reqObj.email,salt);
        let firstName = reqObj.first_name;
        let lastName = reqObj.last_name;
        let email = reqObj.email;
        let password = bcrypt.hashSync(reqObj.password,salt);
        let phone = reqObj.phone;
        let type_id = reqObj.type_id;

       const user = new User(profileId,firstName,lastName,email,password,phone,type_id);
        
        user.insertIntoDb(res,function(err,result) { 

            if(err) {

                // res.send(err);
                return callback(err);
            }
             else {

               let token = getCreateToken(profileId,req,callback);
                callback(null, token);
            }  
        });
    }

    else {

 res.json(errorobj);

}
}

};

/*validating user input*/
 function inputValidation(reqObj) {

 	 let errorJson = {};

    if(validator.isEmpty(reqObj.first_name) == true) {

		 errorJson.key1 = {"err":"first name should not be empty",
		                   "code":"101",
                           "field":"first_name"
                          }
    }
    
    if(validator.isEmpty(reqObj.last_name) == true) {

		errorJson.key2 = {"err":"Last name should not be empty",
                          "code":"102",
                          "field":"last_name"
                         }
	}

	if(validator.isEmpty(reqObj.email) == true) {

		errorJson.key3 = {"err":"Email should not be empty",
                          "code":"103",
                          "field":"email"
                         }
	} 

	 if(validator.isEmail(reqObj.email) == false) {

    	errorJson.key4 = {"err":"Invalid email",
                          "code":"104",
                          "field":"email"
                         }

    }

     if(validator.isEmpty(reqObj.password) == true) {

     	errorJson.key5 = {"err":"password should not be empty",
                          "code":"105",
                          "field":"password"
                         }

     }

      if(validator.isLength(reqObj.password,{min:8, max: undefined}) == false) {

     	errorJson.key6 = {"err":"password should be ",
                          "code":"106",
                          "field":"password"
                         }

     }

      if(validator.isEmpty(reqObj.phone) == true) {

      	errorJson.key7 = {"err":"phone should not be empty",
                          "code":"107",
                          "field":"phone"
                         }

      }

      if(validator.isMobilePhone(reqObj.phone,['en-IN']) == false) {

      	errorJson.key8 = {"err":"Invalid phone no",
                          "code":"108",
                          "field":"phone"
                         }

      }

       if(validator.isEmpty(reqObj.type_id) == true) {

         errorJson.key9 = {"err":"type_id should not be empty",
                           "code":"109",
                           "field":"type_id"
                          }
       }

       if(validator.isInt(reqObj.type_id) == false) {

         errorJson.key10 = {"err":"Invalid type_id",
                           "code":"110",
                           "field":"type_id"
                          }
       }

       return errorJson;
 }

/*token generation*/
function getCreateToken(profile,req,callback) {

    let expires = moment().add(7,'days').valueOf();
                    let token = jwt.encode ({
                        iss: profile,
                        exp: expires
                    }, req.app.get('jwtTokenSecret'));
                    return token;
                 // callback(null, token);
}







