var mongoose = require("mongoose");
var nowpill = new mongoose.Schema({
        waiting: {type:Boolean,default:false}
        })



module.exports = mongoose.model("nowpill",nowpill);
