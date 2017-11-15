//load express

var express = require('express');

var app = express();

//static content path
app.use(express.static(__dirname + '/public'));


app.listen(3000)
