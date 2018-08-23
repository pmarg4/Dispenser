// Functions
// ========
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var request = require('then-request');
var mongoose = require("mongoose");
var port = 8080;
var moment = require("moment");
var moment = require('moment-timezone');
moment().tz("Europe/Madrid").format();
const Telegraf = require('telegraf');
const bot = new Telegraf("550843373:AAGA-YrH4sdso1tL-6hfS9UAFDJ7V72sMA4");
var schedule = require('node-schedule');
var passport = require('passport');
var functions = require("functions.js");
var functions = require("pilltime.js");


//CODES NECESSARIES DIVERSES
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
	extended: true
}));

//CONNEXIÓ DB
mongoose.connect("mongodb://localhost/dispenser")
var weekschema = require("../models/weekschema", function(err) {});
var pill = require("../models/pill", function(err) {});
var pillday = require("../models/pillday", function(err) {});
var savedip = require("../models/savedip", function(err) {});
var nowpill = require("../models/nowpill", function(err) {});
var alert = require("../models/alert", function(err) {});

//Codi