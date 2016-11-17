var express=require('express'),
    app = express(),
    path = require('path'),
    root = __dirname,
    port = process.env.PORT || 8000,
    bodyparser = require('body-parser')
    mongoose = require('mongoose')

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

app.listen(8000, function(){});
