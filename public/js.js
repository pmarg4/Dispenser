console.log("hedlo");
var numb = 21;
var act = 0;
var schema = {1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{},11:{},12:{},13:{},14:{},
15:{},16:{},17:{},18:{},19:{},20:{},21:{},
};

var prova1 = {
  hora:1,
  dweek: "Monday"
};
schema[1] = prova1;
console.log(schema);
$(document).ready(function(){


    $(".setm").click(function(){
        act++;
      day = $(this).parent().attr("dia");
      console.log(day);
      $(this).parent().append("<div class='intro'><div class='field'><labe>Hora</label><input type='text' name='"+day+"[hour]'></div><div class='field'>")
        // console.log(act);
    });


});
