var counter = 0;
      $(".day-thumbnail").click(function(){
        $("#mainViewer").html(
            $(this).html());
        
        var id = $(this).attr("id");
        counter = parseInt(id.slice(-1));
      });
      $("#day"+counter).click();

      $("#mainViewer").click(function (event){
        if(event.offsetX
          < $(this).width()*0.3){
            counter = counter - 1;
        } else {
            counter = counter + 1;
        }
        if(counter < 0){
            counter = 0;
        }
        if(counter >=
            $(".day-thumbnail").length){
            counter =
        $(".day-thumbnail").length-1;
        }
        $("#day"+counter).click();
      });