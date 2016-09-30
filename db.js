/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'homestead',
    password: 'secret',
    port: 33060,
    database: 'tripshort_new'
});

connection.connect(function (err) {
    if (err)
        throw err;
});

module.exports = connection;