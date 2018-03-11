console.log("hedlo");
var numb = 21;
var act = 0;


var prova1 = {
  hora:1,
  dweek: "Monday"
};
$(document).ready(function(){


    $(".setm").click(function(){
        act++;
      day = $(this).parent().parent().parent().attr("dia");
      console.log(day);
      console.log(numb);
          $("#contador").text(numb);

      if(numb!=0){
      numb--;

      $(this).parent().parent().append("<li class='intro list-group item'><label>Hora</label><input type='text' class='form-control input'name='"+day+"[hour]'></li>")
        // console.log(act);
  }
  else {
    alert("No queden horaris disponibles, has arribat al màxim de 21")
  }
    });


});
