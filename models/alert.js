var mongoose = require("mongoose");
var alert = new mongoose.Schema({
        alert: {type:Boolean,default:true},
        hour: Number,
        deactivated:{type:Boolean,default:false}
      })



module.exports = mongoose.model("alert",alert);
