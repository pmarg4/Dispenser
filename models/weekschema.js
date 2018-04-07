var mongoose = require("mongoose");
var weekschema = new mongoose.Schema({
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

        }
        // 5:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 6:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 7:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 8:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 9:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 10:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 11:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 12:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 13:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 14:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 15:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 16:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 17:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 18:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 19:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 20:{
        //   dweek: Number,
        //   hour: Number
        // },
        // 21:{
        //   dweek: Number,
        //   hour: Number
        // }

        })



module.exports = mongoose.model("weekschema",weekschema);
