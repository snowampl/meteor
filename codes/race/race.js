window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded(){
	canvasApp();
}

function canvasApp(){

	var divarea = document.getElementById("divforcanvas");
	//console.log(divarea.offsetTop, divarea.offsetLeft);

	var mapRow = 10;
	var mapCol = 10;
	
	var numberPerrow = 10;
	var statusA = 1;
	var statusB = 0;
	var startA = 0;
	var startB = 0;
	var totalNumber = 55;

	var pitNumber = new Array();
	for(var i = 0; i< 5; i++){
		pitNumber[i] = Math.floor((Math.random()*55)+1);
	}

	document.getElementById("enter_form").addEventListener('submit', getRandom,false);

	function getRandom(){

		event.preventDefault();

		document.getElementById("enternumber").value = Math.floor((Math.random()*10)+1);
      	
	}

	document.addEventListener("mouseup", getMousepos, false);

	function  getMousepos(e){
		event.preventDefault();
		var cursorX = e.clientX;
		var cursorY = e.clientY;
		var nextPos = 0;
		var result; //save the content 
		if(cursorX > 40){
			var forward = parseInt(document.getElementById("enternumber").value);
			document.getElementById("enternumber").value = "";
			
			if(statusA == 1 && forward > 0){
				nextPos = startA + forward;
				if(nextPos >= totalNumber){
					nextPos = totalNumber-1;
					alert("A win!");
				}
			}
			else{
				if(statusB == 1 && forward >0){
					nextPos = startB + forward;
					if(nextPos >= totalNumber){
						nextPos = totalNumber-1;
						alert("B win!");
					}
					
				}
				else{
					nextPos = 0;
				}
			}
			result = getLocation(nextPos);
			
			if(parseInt(result.rowNumber)*60 > 30 && ifInside(result)){
				if(statusA > 0){
					startA = nextPos;
					if(droptoPit(nextPos)){
						startA = 0;
					}
				}
				else{
					startB = nextPos;
					if(droptoPit(nextPos)){
						startB = 0;
					}
				}
				var temp = statusA;
				statusA = statusB;
				statusB = temp;
			}
		}

		function droptoPit(entry){
			for(var i=0; i<pitNumber.length; i++){
				if(pitNumber[i] == entry){

					return true;
				}

			}
			return false;
		}

		function ifInside(result){

			var xleft = result.colNumber*60 + 50;
			var yleft = result.rowNumber*60 + 100;
			console.log(xleft, yleft);
			console.log("******");
			console.log(cursorX, cursorY);
			if(cursorX >=xleft && cursorX <= xleft+60 && cursorY >= yleft && cursorY <= yleft+60){
				return true;
			}
			else{
				return false;
			}

		}
		
	}

	var theCanvas = document.getElementById('canvasOne');
	var context = theCanvas.getContext('2d');
	console.log(theCanvas.offsetTop, theCanvas.offsetLeft);

	
	tileSheet = document.createElement("img");
	tileSheet.src = "road.jpeg";
	tileSheet.addEventListener('load', eventSheetLoaded, false);

	function getLocation(entry){
		var row = Math.floor(entry/(numberPerrow+1));
		var col = entry%(numberPerrow+1);
		var sign = 0;
		if(row%2 == 0){
			sign = 0;
		}
		else{
			sign = 1;
		}
		
		if(col == numberPerrow){
			row = row * 2 + 2;
			if(sign == 0){
				col = numberPerrow - 1;
				
			}
			else{
				col = 0;
				
			}

		}
		else{
			row = row * 2 + 1;
			if(sign == 1){
				col = numberPerrow - 1 - col;
			}
		}

		return {rowNumber: row, colNumber: col};
	}
	

	function eventSheetLoaded(){

		startUp();
	}

	function startUp(){
		gameLoop();
	}

	function gameLoop(){
		window.setTimeout(gameLoop, 100);
		update();
		drawScreen();
		

	}

	function drawScreen(){
		drawRoad();
		drawRacer();
		function drawRoad(){
			var k = 0;
			var pos;
			var row;
			var col;
			for(var i=0; i<totalNumber; i++){
				
				pos = getLocation(i);
				row = pos.rowNumber;
				col = pos.colNumber;

				if(i == pitNumber[k]){
					context.drawImage(tileSheet, 0, 160, 60, 60, col*60, row*60, 60, 60);
					k++;
				}
				else{
					context.drawImage(tileSheet, 128, 128, 60, 60, col*60, row*60, 60, 60);
				}


			}



		}
		function drawRacer(){
			var startA_r = startA;
			var pos = getLocation(startA_r);
			var row = pos.rowNumber;
			var col = pos.colNumber;
			context.fillStyle = '#000000';
			context.beginPath();
			context.arc(col*60+15, row*60+15, 15, 0, (Math.PI/180)*360);
			context.closePath();
			context.fill();
			var startB_r = startB;
			pos = getLocation(startB_r);
			row = pos.rowNumber;
			col = pos.colNumber;
			context.fillStyle = "green";
			context.beginPath();
			context.arc(col*60+45, row*60+15, 15, 0, (Math.PI/180)*360);
			context.closePath();
			context.fill();

		}
	}

	function update(){

	}

}