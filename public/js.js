console.log("hedlo");
var numb = 21;
var act = 0;
var rapid = {
	1: [],
	2: [],
	3: [],
	4: [],
	5: [],
	6: [],
	7: [],
}

var prova1 = {
	hora: 1,
	dweek: "Monday"
};
$(document).ready(function() {
	// Enllaços
	$('#configuracio').click(function() {
		window.location = '/horari';
	});
	$('#horari').click(function() {
		window.location = '/schedule';
	});

	$('#alerta').click(function() {
		window.location = '/alerta';
	});
	$('#rapid').click(function() {
		window.location = '/horarirapid';
	});
	// Horari
	$(".setm").click(function() {
		act++;
		day = $(this).parent().parent().parent().attr("dia");
		console.log(day);
		numb--;

		$("#contador").text(numb);
		if (numb > 0) {

			$(this).parent().parent().append("<li class='intro list-group item'><label>Hora</label><input type='text' class='form-control input'name='" + day + "[hour]'></li>")
			// console.log(act);
		} else {
			alert("No queden horaris disponibles, has arribat al màxim de 21")
		}
	});



});