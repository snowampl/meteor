var balls = new Array();
var status;
r = 15;
oy = 125;
ox = 50;
var lennumber;
var count=0;
var drop = 0;
var currentline;
var speed = 5;
var totalball=24;
window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded(){

	
	

	document.getElementById("enter_form").addEventListener('submit', get_and_update,false);

	function get_and_update(){

		event.preventDefault()

		drop = 1;
		
		

		
      	
	}
	
	function updatestatus(newvalue){
		status = newvalue;
		lennumber = 24/status;
		console.log(status);
		console.log(lennumber);
		
	}
		console.log(status);


		function canvasApp(){
			balls = new Array();
			status = 0;
			totalball = 24;
			for(var i=0; i<totalball; i++){
				tempball = {x:0, y:0};
				balls.push(tempball);
			}
			
		}
			
		

	function drawScreen(){

		if(balls.length!=24){
			canvasApp();
			
		}
		theCanvas = document.getElementById("canvasOne");
		context = theCanvas.getContext("2d");
		context.fillStyle='#EEEEEE';
		context.fillRect(0, 0, theCanvas.width, theCanvas.height);
		context.strokeStyle='#000000';
		context.strokeRect(1, 1, theCanvas.width-2, theCanvas.height-2);
		var k = 0;
		var nstatus = parseInt(document.getElementById("enternumber").value);
		if(nstatus != status){
			status = nstatus;
			if(status>0){
				count = 0;
			}	
			lennumber = 24/status;
			currentline = lennumber; 

			

				for(var i = 0; i<lennumber; i++){
					tempy = oy+i*r*2;
					for(var j = 0; j<status; j++){
						tempx = ox+j*r*2;
						balls[k].x = tempx;
						balls[k].y = tempy;
						k++;

					}
				}
			}

			
			if(drop>0){

				k = totalball - status ;
				if(k >= 0){

					for(var j = 0; j< status; j++)
					{
						balls[k].y = balls[k].y + speed;
						if(balls[k].y > theCanvas.height){
							totalball = k;
							count += 1;
							if(k==0){
								drop = 0;
								balls = [];
								document.getElementById("enternumber").value = " ";
								
							}
							
							break;
						}
						k++;
					}

				}
				
				
			}

			


			
			
			

			
		
			for(var i = 0; i< totalball; i++){
				context.fillStyle = '#000000';
				context.beginPath();
				context.arc(balls[i].x, balls[i].y, 15, 0, Math.PI*2);
				context.closePath();
				context.fill();
			}

			for(var i=0; i< count; i++){
				img = document.createElement("img");
				img.src = "star.jpeg";
				context.drawImage(img, 128, 128, 60, 60, 400, 20+80*i, 60, 60);

			}

		} //if status>0
	

	function gameLoop(){
		window.setTimeout(gameLoop, 20);
		drawScreen();

	}

	
	gameLoop();
		

}