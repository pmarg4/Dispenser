var mongoose = require("mongoose");
var moment = require("moment")
var pillday = new mongoose.Schema({
        date1: {
          month:Number,
          day:Number,
          hour:Number
        },
        date2: {
          month:Number,
          day:Number,
          hour:Number
        },        time:Number,
        late:Number,
        moved:{
          type:Boolean, default:false
        },
        edited: {
          type:Boolean, default:false
        },
        taken: {
          type:Boolean, default:false
        }
              });

module.exports = mongoose.model("pillday",pillday);
