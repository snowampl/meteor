
        
        //this will hide the initial div that has been created
        $(document).ready(function(){
            $("#mainViewer").hide(0);
        });

        console.log("This is the start");
		// this is a variable to keep track
		// of which friend we are on
		var counter = -1;
        var prevCounter = 10;
         
        console.log(counter);
        console.log(prevCounter);
       
        $(document).ready(function(){

            $(".friend-thumbnail").click(function(){
                console.log("Touch");   
            });

		// when we click on a friend thumbnail
		// it toggles the displays and shows friend details 
		// counter is updated as well to manage whether to hide or show 
        $(".friend-thumbnail").click(function(){

            console.log("Here");
            var id = $(this).attr("id");
            counter = parseInt(id.slice(-1));

            if(counter != prevCounter){
                $("#mainViewer").slideDown("slow");          
                // copy the html from the thumbnail (this)
                // to the main viwer
                $("#mainViewer").html( 
                    $(this).html());
                // get the id of this element so we can
                // get hold of its number
                var id = $(this).attr("id");
                // set the counter to the number of the 
                // friend we selected. 
                // We get this by taking the last charcter
                // of the id and convert it to a number
                // id.slice gets a subsection of the string
                // passing in -1 means we get just the
                // last character
                // parseInt converts it to a number (integer)

            }
                    //if the id is the same
            else{
                $("#mainViewer").slideToggle("slow");  
                $("#mainViewer").html( 
                    $(this).html());
            }
                    prevCounter = parseInt(id.slice(-1));
                  
		  });
        });

		
        