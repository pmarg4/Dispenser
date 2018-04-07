var mongoose = require("mongoose");
var pillday = new mongoose.Schema({
        time:Number,
        late:Number,
        taken:String
        });

module.exports = mongoose.model("pillday",pillday);
