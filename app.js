//MODULS DE NODE
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var mongoose = require("mongoose");
var port = 8080;
var moment = require("moment");
var moment = require('moment-timezone');
const Telegraf = require('telegraf');
const bot = new Telegraf("550843373:AAGA-YrH4sdso1tL-6hfS9UAFDJ7V72sMA4");
moment().tz("Etc/GMT+2").format();
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


//FUNCIÓ ENVIAR DADES A arduino
function sendData(steps,ip){
  ip1 = "http://" + String(ip[3]) + "/girar/20";
  console.log(ip1);
  const req = request(ip1,function(err,resp,body){
  req.end();
  });
}

app.get("/horari", function(req, res) {

  res.render("schedule.ejs");

})
app.get("/index", function(req, res) {
  bot.telegram.sendMessage("@pilldispenser", "hola");

  res.render("index.ejs");

})

app.post("/add/schema", function(req, res) {
  weekschema.remove().exec();
  var variable;
  variable = req.body;

  weekschema.create({1:variable[1],2:variable[2]}, function(err, docs) {
    if (docs) {
      console.log(docs);
    } else {
      console.log(err);
    }
  });

  res.redirect("../index");
})

app.get("/prova1",function(req,res){
  ip = req.ip.split(":");
  sendData(100,ip);

  weekschema.findOne({}, function(err, docs) {
    console.log(docs[1].hour);
    res.render("horari.ejs",{monday:docs});

  })


})
app.get("/home", function(req, res) {
  weekschema.findOne({}, function(err, docs) {
var date = 1;
var hour = 11;
// console.log(docs[date]);
docs[1].hour.forEach(function(element){
if(hour==element){
  console.log("wee");
  pillday.create({hour:1},function(err,docs){
    if(err){
      console.log(err);
    }
  });
  pillday.findOne({},function(err,docs) {
    console.log(docs);
  })
}
})
})
});


app.get("/arduino", function(req, res) {

  ip = req.ip.split(":");

  savedip.create({ip:ip[3]})
  savedip.findOne({},function(err,docs){
    console.log(docs);
  })
  // pill.create({time});
  //
  // pill.find({},function(err,docs){
  //   console.log(docs)
});









app.listen(80, function() {
  console.log("server is running");
});
