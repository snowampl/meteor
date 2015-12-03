      var paused = false;

    $(".crop-img").click(function(){
        $("#bigImage").attr('src', 
            $(this).attr('src'));
    });

      var counter = 1;

      $("#image"+counter).click();

      $("#backward").click(function(){
        counter = counter - 1
        if (counter < 1){
          counter = 12;
        }
        $("#image"+counter).click();
        
      });

      $("#forward").click(function(){
        counter = counter + 1
        if (counter > 12){
          counter = 1;
        }

        $("#image"+counter).click();
      });

      $("#bigImage").click(function(){
        paused = !paused;
      });

      setInterval(function(){
        if(!paused){
          $("#forward").click();
        };
      }, 3000);
