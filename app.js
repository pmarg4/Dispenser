//MODULS DE NODE
var express    = require('express');
var app        = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var port     = 8080;

//CODES NECESSARIES DIVERSES
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//CONNEXIÓ DB
mongoose.connect("localhost/dispenser")
var weekschema = require("./models/weekschema",function(err){
});



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

// })
weekschema.create({
        1:{
                dweek:5,
                hour:11
        },function(err,docs){
                if(err){
                        console.log(err);
                        console.log("Nope");
                }else{
                        console.log(docs);
                        console.log("ww");
                }
        }
});
// weekschema.find({},function(err,docs){
//         console.log(docs);
// });


app.listen(80, function(){
    console.log("server is running");
})
