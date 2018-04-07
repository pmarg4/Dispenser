var mongoose = require("mongoose");
var savedip = new mongoose.Schema({
        ip:String
      });

module.exports = mongoose.model("savedip",savedip);
