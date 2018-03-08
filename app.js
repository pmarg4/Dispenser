//MODULS DE NODE
var express    = require('express');
var app        = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var port     = 8080;
var moment = require("moment");
var moment = require('moment-timezone');
moment().tz("Etc/GMT+2").format();
//CODES NECESSARIES DIVERSES
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
//CONNEXIÓ DB
mongoose.connect("mongodb://localhost/dispenser")
var weekschema = require("./models/weekschema",function(err){
});
var pill = require("./models/pill",function(err){});

 weekschema.remove().exec();

app.get("/index", function(req,res){
//     pill.find({},function(err,pills){
//             if(err){
//                     console.log("error");
//             } else{
//                     res.render("index");
//             }
//     })


      res.render("index.ejs");

})
var schedule = [];
app.post("/add/schema",function(req,res){

var schema1 = req.body.Monday;
console.log(schema1);
weekschema.create({1:schema1},function(err,docs){
  if(docs){
    console.log(docs); }
    else{
      console.log(err);
    }
});
weekschema.find({},function(err,docs){
  console.log(docs);
})
  res.redirect("../index");
})
// var dia = {
//   dweek:5
// };
// // })
// weekschema.create({dia},function(err,docs){
//                 if(err){
//                         console.log(err);
//                         console.log("Nope");
//                 }else{
//                         console.log(docs);
//                         console.log("ww");
//                 }
//         });
//
// weekschema.find({},function(err,docs){
//         console.log(docs);
//         console.log("DDAA");
// });
app.get("/arduino/removed", function(req,res){
  var time = {
    hour : moment().hour()+1,
    minute : moment().minute()
  };
  console.log(time);
  // pill.create({time});
  //
  // pill.find({},function(err,docs){
  //   console.log(docs)
});


app.get("/home", function(req,res){
  res.render("home.ejs");

});

//provesrares

// var prova2 ={
// 1:{
//   hour:16,
//   dweek:1
// },
// 2:{
//   hour:16,
//   dweek:2
// },
// 3:{
//   hour:18,
//   dweek:1
// }
// };
// for(i=0;i<22;i++){
//   provasorted = Object.keys(prova2[i]).sort(function(a,b){return prova2[a]-prova2[b]})
//
//   console.log(provasorted);
// }
//
//
//
//





app.listen(80, function(){
    console.log("server is running");
});
