
"use strict";

let db = require('../db');
let User = require('../models/user');
let bcrypt = require('bcrypt');
let jwt = require('jwt-simple');
let moment = require('moment');

module.exports = class AuthController {

/*register user*/
 create(reqObj, res, req, callback){
         
        const user = new User();
        let salt = bcrypt.genSaltSync(10);
         let hash_password = bcrypt.hashSync(reqObj.password,salt);
         let hash_email = bcrypt.hashSync(reqObj.email,salt);
         let valid=userValidate(reqObj);
                if(valid!="success"){res.send(valid)}
                     else{
        user.insertIntoDb(reqObj,hash_password,hash_email,res,function(err,result){

                token(hash_email,req,callback);  
            
        });
    }
        
    }
 
    authenticate(email, password, req, callback){
         
        const user = new User();
        user.findByEmail(email,function(err, profile){
            
                bcrypt.compare(password, profile.password, function (err, doesMatch) {

                    token(profile.profile_id,req,callback);
                
            });
        })
        
    }
    
    getUser(token, req, callback){
        const user = new User();
        if(token){
            let decoded = jwt.decode(token, req.app.get('jwtTokenSecret'));
            console.log(decoded.iss);
            let profileId = decoded.iss;
            user.findById(profileId, function(err, profile){
                if (err)
                    return callback(err);
                
                callback(null, profile);
            });
        }
    }
    
};


/*token generation*/
function token(profile_id,req,callback){
    let expires = moment().add(7,'days').valueOf();
                    let token = jwt.encode({
                        iss: profile_id,
                        exp: expires
                    }, req.app.get('jwtTokenSecret'));
                    
                    callback(null, token);
}

/*user validation*/
function userValidate(reqObj){
    if(reqObj.first_name==""){return("First name should not be null")}
        else if(reqObj.first_name.length>25){return("First name is too lengthy")}
        else if(isNaN(reqObj.first_name)==false){return("Invalid first name")}
        else if(isValid(reqObj.first_name)==false){return("First name should not contain special characters")}
        else if(reqObj.last_name==""){return("Last name should not be null")}
        else if(reqObj.last_name.length>25){return("Last name is too lengthy")}
        else if(isNaN(reqObj.last_name)==false){return("Invalid last name")}
        else if(isValid(reqObj.last_name)==false){return("Last name should not contain special characters")}
        else if(reqObj.email==""){return("Email number should not be null")}
        else if(validateEmail(reqObj.email)==false){return("Invalid email")}  
        else if(reqObj.phone==""){return("Phone number should not be null")}
        else if(isNaN(reqObj.phone)==true){return("Invalid phone number")}
        else if(phonenumber(reqObj.phone)==false){return("Invalid phone number")}
        else if(reqObj.password==""){return("Password should not be null")}
        else if(reqObj.password.length<4){return("Password length be 4 to 10")}
        else if(reqObj.password.length>10){return("Password length be 4 to 10")}
        else if(reqObj.type_id==""){return("Type id should not be null")}
        else if((reqObj.type_id==1)||(reqObj.type_id==2)||(reqObj.type_id==3)){return ("success")}
        else if(reqObj.type_id!=1){return("Invalid type_id")}
        else if(reqObj.type_id!=2){return("Invalid type_id")}
        else if(reqObj.type_id!=3){return("Invalid type_id")}
        else{return("success")}
}

/*finding special characters*/
function isValid(str) {
    
    var iChars = "~`!#$%^&*+=-[]\\\';,/{}|\":<>?";

    for (var i = 0; i < str.length; i++) {
       if (iChars.indexOf(str.charAt(i)) != -1) {
           return false;
       }
    }
    return true;
}

/*validate phone number*/
function phonenumber(p) {
  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  var digits = p.replace(/\D/g, "");
  return (digits.match(phoneRe) !== null);
}

/*validate email*/
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



