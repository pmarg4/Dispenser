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


//FUNCIONS COM A TALS
module.exports = {
  CheckPastilla: function(tard, callback) {
    emergency.findOne({}, function(err, docs) {
      if (docs.emergency) {
        console.log("Noooo");
      }
    })
    pillday.findOneAndUpdate({
      edited: false
    }, {
      "$set": {
        "edited": true
      }
    }, function(err, docs) {
      console.log(docs);
      if (tard) {
        bot.telegram.sendMessage("@pilldispenser", "No s'ha prés la pastilla, comprova l'estat de salut");
        var h = moment().hour() + 2;
        alert.create({
          hour: h
        }, function(err, docs) {
          console.log(docs);
        })
        var alerta = true
        callback(alerta);
      }
    });


  },
  //
  //
  pillday: function() {

    //Canviem ANTERIORS
    pillday.findOneAndUpdate({
      edited: false
    }, {
      $set: {
        edited: true
      }
    }, function(err, docs) {
      if (err) {
        console.log("No hi ha pastilles a actualitzar");
      } else {
        console.log(docs);
      }
    });
  },
  taken: function() {

    //Canviem ANTERIORS
    pillday.findOneAndUpdate({
      edited: false,
      taken: false
    }, {
      $set: {
        edited: true,
        taken: true
      }
    }, function(err, docs) {
      if (err) {
        console.log("No hi ha pastilles a actualitzar");
      } else {
        console.log(docs);
      }
    });
  },
  //
  //
  CheckSchedule: function() {
    var h = moment().hour() + 2;
    var wd = moment().isoWeekday();
    weekschema.findOne({}, function(err, docs) {
      if(docs.alert == false){
      docs[wd].hour.forEach(function(time) {
        if (time == h) {

          bot.telegram.sendMessage("@pilldispenser", "Hora de la pastilla");
          pillday.create({date1: {
              month: moment().month(),
              day: moment().date(),
              hour: moment().hour() + 2
            }}, function(err, docs) {
            console.log(docs);
            console.log(moment().date());
            request("get","https://dispenser.localtunnel.me/girar/92");
         })

        }
        else{
          console.log("No és hora");
        }}
      )}
      if(docs.alert == true){
        console.log("Hi ha una alerta");
        alert.findOneAndUpdate({alerta:true},{$inc:{hours:1}},function(err,docs){
          console.log(docs);
        })
      }
    })
  },
  sendData: function(ip, steps) {
    ip1 = "http://" + ip + "/girar/90";
    // console.log(ip1);
    const req = request(ip, function(err, resp, body) {});
    req.end()
  },
  // alerta: function(al) {
  //   if(al){
  //     alert.create({hour:moment().hour()},function(err,docs){
  //       console.log("alerta creada");
  //       console.log(docs);
  //     });
  //   }else{
  //     alert.findOneAndUpdate({alerta:true},{$set:{alerta:false,deactivated:true}},function(err,docs){
  //       console.log(docs);
  //     })
  //
  //   }
  // },
  pastilla: function(){

    pillday.findOneAndUpdate({"edited":false},{$set:{taken:true,edited:true,date2: {
        month: moment().month(),
        day: moment().date(),
        hour: moment().hour() + 2
      }}},function(err,docs){
      console.log(docs);
    })

  },
  activar: function(){
    pillday.findOneAndUpdate({edited:false,taken:false},{$set:{edited:true,taken:true}},function(err,docs){
      if(docs){
        weekschema.findOneAndUpdate({one:true},{$set:{alert:true}},function(err,docs){
          console.log("Alerta activada");
          bot.telegram.sendMessage("@pilldispenser","Alerta Actiada!");
          alert.create({hour:moment().hour()+2,day:moment().date(),month:moment().month()});
        })

      }
    })
  },
  desactivar: function(){
    alert.findOneAndUpdate({alerta:true,deactivated:false},{$set:{deactivated:true,alerta:false}},function(err,docs){
      console.log(docs);
    });
    weekschema.findOneAndUpdate({one:true},{$set:{alert:false}},function(err,docs){
      console.log(docs);
    });

  }
};
