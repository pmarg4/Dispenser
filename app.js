//MODULS DE NODE
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var request = require('then-request');
var mongoose = require("mongoose");
var port = 8080;
var moment = require("moment");
var moment = require('moment-timezone');
moment().tz("Europe/Madrid").format();
const Telegraf = require('telegraf');
const bot = new Telegraf("550843373:AAGA-YrH4sdso1tL-6hfS9UAFDJ7V72sMA4");
var schedule = require('node-schedule');
var functions = require("./functions/functions.js");
var pillhora = require("./functions/pilltime.js");

var passport = require('passport');
const basicAuth = require('express-basic-auth');

//CODES NECESSARIES DIVERSES
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
	extended: true
}));
//CONNEXIÓ DB
mongoose.connect("mongodb://localhost/dispenser")
var weekschema = require("./models/weekschema", function(err) {});
var pill = require("./models/pill", function(err) {});
var pillday = require("./models/pillday", function(err) {});
var savedip = require("./models/savedip", function(err) {});
var nowpill = require("./models/nowpill", function(err) {});
var alert = require("./models/alert", function(err) {});


//ROUTES

app.get("/horari", function(req, res) {

	res.render("schedule.ejs");

})

app.post("/add/rapid", function(req, res) {
	weekschema.remove().exec();

	console.log(req.body);
	body = req.body;
	horari = {
		hour: [body[1], body[2], body[3]]
	}
	console.log(horari);
	// weekschema.create({})
	// console.log("hola");
	// weekschema.remove().exec();
	// var variable;
	// variable = req.body;
	// console.log(variable[1]);
	//
	weekschema.create({
		1: horari,
		2: horari,
		3: horari,
		4: horari,
		5: horari,
		6: horari,
		7: horari
	}, function(err, docs) {
		if (docs) {
			console.log(docs);
		} else {
			console.log(err);

		}
	});

	res.redirect("../schedule");
})
app.get("/horarirapid", function(req, res) {

	res.render("rapid.ejs");

})
var user = basicAuth({
	users: {
		admin: 'admin'
	},
	challenge: true // <--- needed to actually show the login dialog!
})
app.get("/index", function(req, res) {
	bot.telegram.sendMessage("@pilldispenser", "hola");

	res.render("index.ejs");

});
app.get("/schedule", function(req, res) {
	weekschema.findOne({}, function(err, docs) {

		res.render("horari.ejs", {
			docs: docs
		});

	})

});

app.post("/add/schema", function(req, res) {
	console.log("hola");
	weekschema.remove().exec();
	var variable;
	variable = req.body;
	console.log(variable[1]);

	weekschema.create({
		1: variable[1],
		2: variable[2],
		3: variable[3],
		4: variable[4],
		5: variable[5],
		6: variable[6],
		7: variable[7]
	}, function(err, docs) {
		if (docs) {
			console.log(docs);
		} else {
			console.log(err);

		}
	});

	res.redirect("../index");
})
app.get("/prova", async function(req, res) {
	var hora = await pillhora.getTime();
	console.log(hora);
	var alerta = await pillhora.CheckAlert();
	console.log(alerta);
	if (!alerta) {
		console.log("DSdsdas");
		var comprovar = pillhora.CheckSchedule(hora);
		// console.log(comprovar);
		if (comprovar) {
			await pillhora.pillupdate();
			await pillhora.create();
			await pillhora.girar(92);
		}
	}

	res.render("index")

});


app.get("/alerta", function(req, res) {
	alert.find({}).sort({
		"month": 1,
		"day": 1,
		"hour": 1
	}).exec(function(err, docs) {
		res.render("alerta.ejs", {
			docs: docs
		});
		console.log(docs);
	})
});
// tard = true;
// var alerta = functions.CheckPastilla(tard,function(callback){
//   console.log(callback);
// })

app.get("/arduino", function(req, res) {

	ip = req.ip.split(":");

	savedip.create({
		ip: ip[3]
	});
	functions.pastilla();



});

app.get("/inici", user, function(req, res) {
	pillday.find({}).sort({
		"date1.month": 1,
		"date1.day": 1,
		"date1.hour": 1
	}).exec(function(err, docs) {
		// .sort({"date1.day":-1}).exec(function(err,docs)
		// docs.sort(function(a,b){
		//    return a["date1.day"] - b["date1.day"] || a["date1.hour"] - b["date1.hour"];
		// })ç
		docs1 = docs.reverse();
		console.log(docs1);
		res.render("resum.ejs", {
			docs: docs
		});
	})
})

app.get("/desactivar", function(req, res) {
	functions.desactivar();
	res.redirect("/alerta");
});

app.get("/activar", function(req, res) {
	functions.activar();
});


app.get("/taken", function(req, res) {
	functions.taken();
	console.log("Agafat");
})

app.get("/girar/:id", function(req, res) {
	pillhora.girar(req.params.id);
})
//EXECUCIÓ HORARI CADA Hora
var j = schedule.scheduleJob({
	minute: 0
}, function() {
	async function test() {
		var hora = await pillhora.getTime();
		console.log(hora);
		var alerta = await pillhora.CheckAlert();
		console.log(alerta);
		if (!alerta) {
			var comprovar = pillhora.CheckSchedule(hora);
			console.log(comprovar);
			if (comprovar) {
				await pillhora.pillupdate();
				await pillhora.create();
				await pillhora.girar(92);
			}
		}
	}
	test();
})

var f = schedule.scheduleJob({
	minute: 30
}, function() {
	functions.activar();
})

// var CheckSchedule = function(){
//   var h = moment().hour() + 2;
//   var wd = moment().isoWeekday();
//   weekschema.findOne({},function(err,docs){
//     docs[wd].hour.forEach(function(time){
//       if(time==h){
//         bot.telegram.sendMessage("@pilldispenser","Hora de la pastilla");
//         sendData(90,"83.41.32.227");
//       }
//     })
//   })
// }
// var CheckPastilla = function(tard){
//   pillday.findOne({edited:false},{$set:{edited:true}},function(err,docs){
//     if(tard){
//     bot.telegram.sendMessage("@pilldispenser","No s'ha prés la pastilla, comprova l'estat de salut");
//   }
// })
// }
// var tard = true;
// sendData(90,"83.41.32.227");

//BOT telegram
// bot.command('/girar', (ctx) => ctx.reply("Quants torns?", (ctx) => ctx.hears('hi', (ctx) => ctx.reply('Hey there'))))

bot.startPolling()

app.listen(80, function() {
	console.log(" server is running");
});