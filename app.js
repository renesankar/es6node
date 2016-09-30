var express = require('express');
var jwt = require('jwt-simple');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var routes = require('./routes/index');
var users = require('./routes/users');
//var db = require('./db');

/*var mysql = require('mysql'), // node-mysql module
        myConnection = require('express-myconnection'), // express-myconnection module
        dbOptions = {
            host: '127.0.0.1',
            user: 'homestead',
            password: 'secret',
            port: 33060,
            database: 'tripshort_new'
        };
*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//JWT secret key
app.set('jwtTokenSecret', '1CRiBb6AAjQxrd/DPYlQQ+Lg/5/l4TVPE9XIwHvE/2U=');

//app.use(myConnection(mysql, dbOptions, 'pool'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




module.exports = app;