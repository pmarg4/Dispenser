var mongoose = require("mongoose");
var pill = new mongoose.Schema({
        time:{
          hour:Number,
          minute:Number  
        },
        timeName:String
      });

module.exports = mongoose.model("pill",pill);
