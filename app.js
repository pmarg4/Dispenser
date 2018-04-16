//MODULS DE NODE
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var mongoose = require("mongoose");
var port = 8080;
var moment = require("moment");
var moment = require('moment-timezone');
moment().tz("Europe/Madrid").format();
const Telegraf = require('telegraf');
const bot = new Telegraf("550843373:AAGA-YrH4sdso1tL-6hfS9UAFDJ7V72sMA4");
var schedule = require('node-schedule');
var functions = require("./functions/functions.js");
var passport = require('passport');
const basicAuth = require('express-basic-auth');

//CODES NECESSARIES DIVERSES
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
//CONNEXIÓ DB
mongoose.connect("mongodb://localhost/dispenser")
var weekschema = require("./models/weekschema", function(err) {});
var pill = require("./models/pill", function(err) {});
var pillday = require("./models/pillday", function(err) {});
var savedip = require("./models/savedip", function(err) {});
var nowpill = require("./models/nowpill", function(err) {});
var alert = require("./models/alert", function(err) {});
var emergency = require("./models/emergency", function(err) {});


//ROUTES

app.get("/horari", function(req, res) {

  res.render("schedule.ejs");

})
var user = basicAuth({
    users: { admin: 'admin' },
    challenge: true // <--- needed to actually show the login dialog!
})
app.get("/index",user, function(req, res) {
  bot.telegram.sendMessage("@pilldispenser", "hola");

res.render("index.ejs");

});

app.post("/add/schema", function(req, res) {
  console.log("hola");
  weekschema.remove().exec();
  var variable;
  variable = req.body;
  console.log(variable[1]);

  weekschema.create({
    1: variable[1],
    2: variable[2],
    3: variable[3],
    4: variable[4],
    5: variable[5],
    6: variable[6],
    7: variable[7]
  }, function(err, docs) {
    if (docs) {
      console.log(docs);
    } else {
      console.log(err);

    }
  });

  res.redirect("../index");
})
app.get("/home", function(req, res) {
  functions.pillday();
  functions.CheckSchedule();
  res.render("index")
});
// tard = true;
// var alerta = functions.CheckPastilla(tard,function(callback){
//   console.log(callback);
// })

app.get("/arduino", function(req, res) {

  ip = req.ip.split(":");

  savedip.create({
    ip: ip[3]
  });
  functions.pastilla();


});

app.get("/inici",function(req,res){
  pillday.find({},function(err,docs){
    var dates = [];
    docs.forEach(function(doc){
      var localDate = moment(doc.date).utcOffset(2 * 60); //set timezone offset in minutes
      console.log(localDate.format()); //2015-01-30T20:00:00+10:00

      dates.push(localDate);
    })
    console.log(dates);
    res.render("resum.ejs",{docs:docs});
  })
})
//EXECUCIÓ HORARI CADA Hora
var j = schedule.scheduleJob({
  minute: 0
}, function() {
  functions.pillday();
  functions.CheckSchedule();
  })

//
// var CheckSchedule = function(){
//   var h = moment().hour() + 2;
//   var wd = moment().isoWeekday();
//   weekschema.findOne({},function(err,docs){
//     docs[wd].hour.forEach(function(time){
//       if(time==h){
//         bot.telegram.sendMessage("@pilldispenser","Hora de la pastilla");
//         sendData(90,"83.41.32.227");
//       }
//     })
//   })
// }
// var CheckPastilla = function(tard){
//   pillday.findOne({edited:false},{$set:{edited:true}},function(err,docs){
//     if(tard){
//     bot.telegram.sendMessage("@pilldispenser","No s'ha prés la pastilla, comprova l'estat de salut");
//   }
// })
// }
// var tard = true;
// sendData(90,"83.41.32.227");


app.listen(80, function() {
  console.log(" server is running");
});
