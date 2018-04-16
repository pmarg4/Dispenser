var mongoose = require("mongoose");
var emergency = new mongoose.Schema({
        emergency: {type:Boolean,default:false},
        date1: { type : Date, default: Date.now() },
        date2: { type : Date},
        a: {type:Boolean,default:true}
      })



module.exports = mongoose.model("emergency",emergency);
