// Functions
// ========
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
var passport = require('passport');
var functions = require("./functions.js");


//CODES NECESSARIES DIVERSES
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
	extended: true
}));

//CONNEXIÓ DB
mongoose.connect("mongodb://localhost/dispenser")
var weekschema = require("../models/weekschema", function(err) {});
var pill = require("../models/pill", function(err) {});
var pillday = require("../models/pillday", function(err) {});
var savedip = require("../models/savedip", function(err) {});
var nowpill = require("../models/nowpill", function(err) {});
var alert = require("../models/alert", function(err) {});

module.exports = {

	//Funció que comprova si hi ha una alerta activada
	CheckAlert: async function() {
		return new Promise(function(resolve, reject) {

			weekschema.findOne({}, function(err, docs) {
				if (err) {
					functions.DBerror(err);
				} else {
					if (docs.alert == true) {
						console.log("Hi ha una alerta activada, no es pot prosseguir");
						//Es registra que ha passat una hora més de la pastilla
						alert.findOneAndUpdate({
							alerta: true
						}, {
							$inc: {
								hours: 1
							}
						}, function(err, docs) {
							console.log(docs);
						})
						resolve(true);
					} else {
						console.log("No hi ha cap alerta!!");
						resolve(false);
					}
				}
			})
		})
	},
	//Obtenció de l'hora i dia de la setmana
	getTime: async function() {
		var hora = {
			h: moment().hour() + 2,
			wd: moment().isoWeekday()
		}
		return hora;
	},
	//Comprovem si es hora de la pastilla
	CheckSchedule: async function(hora) {
		var seguir;
		weekschema.findOne({}, function(err, docs) {
			if (err) {
				functions.DBerror(err);
			} else {
				//Comprovem si l'hora i el dia són correctes o no



				docs[hora.wd].hour.forEach(function(time) {
					if (hora.h == time) {
						console.log("Hora de la medicació");
						return seguir = true;
					}
				})

			}
			console.log(seguir);
			return seguir;
		})
		return seguir;
	},
	//Actualitzem les hores anteriors abans de la nova, per evitar possibles problemes
	pillupdate: async function() {
		pillday.findOneAndUpdate({
			edited: false
		}, {
			"$set": {
				"edited": true
			}
		}, function(err, docs) {
			if (err) {
				functions.DBerror(err);
			} else {
				console.log("S'han actualitzat les hores anteriors");
			}
		})
	},
	//actualitzem l'event per tal que quedi guardat que s'ha pres la pastilla
	taken: async function() {
		pillday.findOneAndUpdate({
			"edited": false
		}, {
			$set: {
				taken: true,
				edited: true,
				date2: {
					month: moment().month() + 3,
					day: moment().date(),
					hour: moment().hour() + 2
				}
			}
		}, function(err, docs) {
			console.log(docs);
		})
	},
	create: async function() {
		pillday.create({
			date1: {
				month: moment().month()+1,
				day: moment().date(),
				hour: moment().hour() + 2
			}
		}, function(err, docs) {
			console.log(docs);
			console.log(moment().date());
		})
	},
	//Fa girar el disepnsador
	girar: async function(steps) {
		request("get", "https://dispenser.localtunnel.me/girar/" + steps);
		request("get", "https://dispenser1.localtunnel.me/girar/" + steps);
		request("get", "https://dispensador.localtunnel.me/girar/" + steps);
		request("get", "https://dispensador1.localtunnel.me/girar/" + steps);
		console.log("girant..." + steps);


	},
	//Es comprova si s'ha pres la pastilla
	check: async function() {
		pillday.findOneAndUpdate({
			edited: false
		}, {
			"$set": {
				"edited": true
			}
		}, function(err, docs) {
			if (docs) {
				console.log(docs);
				if (docs.taken == false) {
					var h = moment().hour() + 2;
					alert.create({
						hour: h
					}, function(err, docs) {
						console.log(docs);
					})
					console.log("No s'ha agafat");

					var alerta = true
					return alerta;
				} else {
					console.log("S'ha agafat");
				}
			} else {
				console.log("No s'ha trobat cap per actualitzar");
			}

		});
	},
	activar: async function() {
		pillday.findOneAndUpdate({
			edited: false,
			taken: false
		}, {
			$set: {
				edited: true,
				taken: false
			}
		}, function(err, docs) {
			if (docs) {
				weekschema.findOneAndUpdate({
					one: true
				}, {
					$set: {
						alert: true
					}
				}, function(err, docs) {
					console.log("Alerta activada");
					bot.telegram.sendMessage("@pilldispenser", "Alerta Activada!");
					alert.create({
						hour: moment().hour() + 2,
						day: moment().date(),
						month: moment().month()+1
					});
				})

			}
		})
	},
	desactivar: async function() {
		alert.findOneAndUpdate({
			alerta: true,
			deactivated: false
		}, {
			$set: {
				deactivated: true,
				alerta: false
			}
		}, function(err, docs) {
			console.log(docs);
		});
		weekschema.findOneAndUpdate({
			one: true
		}, {
			$set: {
				alert: false
			}
		}, function(err, docs) {
			console.log(docs);
		});

	}

}
