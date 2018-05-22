var mongoose = require("mongoose");

var weekschema = new mongoose.Schema({
        one:{
          type:Boolean,
          default:true
        },
        alert: {
          type:Boolean,
          default:false
        },
        1:{
          hour: [],
          description: String
        },
        2:{
          hour: [],
          description: String

        },
        3:{
          hour: [],
          description: String

        },
        4:{
          hour: [],
          description: String

        },
        5:{
          hour: [],
          description: String

        },
        6:{
          hour: [],
          description: String

        },
        7:{
          hour: [],
          description: String

        }
      })


module.exports = mongoose.model("weekschema",weekschema);
