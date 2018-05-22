var mongoose = require("mongoose");
var alert = new mongoose.Schema({
        alerta: {type:Boolean,default:true},
        hour: Number,
        day: Number,
        month: Number,
        deactivated:{type:Boolean,default:false},
        hours: {type:Number,default:0}
      })



module.exports = mongoose.model("alert",alert);
