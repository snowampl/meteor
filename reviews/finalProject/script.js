   
// whether the slideshow is paused or not

    		var paused = false;
    

// the counter variable that keeps
// track of which image you are showing
		   var counter = 1;

delay(); 


// 		// when you click on a thumbnail
// 		// it sets the src of the big image
// 		// to be the same as the image
// 		// you clicked on

		function makeBig(){
			$(".crop-img").click(function(){
			$("#bigImage").attr('src', 
				$(this).attr('src'));
		});
		}
		

		
function clickBackward()
{
	// when you click on the backwards
		// button select the previous image

			// go back one in the counter
			counter = counter - 1;
			// if we are below 1 (the first
			// image) loop round to 4 (the
			// last image)
			if(counter < 1){
				counter = 4;
			}
			// virtually click on the current
			// image to load it into the big image
			$("#image"+counter).click();
			makeBig();

}
		
function clickForward(){
		// when you click on the backwards
		// button select the next image
		// $("#forward").click(function (){

			// virtually click on the current
			// image to load it into the big image
			$("#image"+counter).click();
			makeBig();

			// go forward one in the counter
			counter = counter + 1;

			// if we are above 4 (the last
			// image) loop round to 1 (the
			// first image)
			if(counter > 4){
				counter = 1;
			}

}


// when you click the big image 
		// toggle pausing. Set paused to 
		// not paused, i.e. if it is paused
		// set it to not paused, if it is 
		// not paused set it to paused
function togglePausing(){



			paused = !paused;
			console.log("paused is "+paused);

}

function delay()
{
			// set interval makes it move 
		// forward every 3 second
		setInterval(function (){
			// first check if it is paused
			if(!paused){
				// virtual click the forward
				// button
				$("#forward").click();
				makeBig();
			};
		}, 2000);
}

