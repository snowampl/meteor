var mi = document.createElement("input");
mi.setAttribute('type', 'text');
mi.setAttribute('value', 'default');
mi.setAttribute('id', 'inputvalue');


var ni = document.createElement("p");
ni.setAttribute('id', 'outputvalue');

document.body.appendChild(mi);
document.body.appendChild(ni);

mi.addEventListener("keypress", presshandler, false);

function presshandler(e){

	var realvalue = 100;

	if (e.which == 13) {

        var guessval = parseInt(mi.value);

        console.log(guessval);

        if(guessval > realvalue){

        	ni.innerHTML =" That is too high";
        }
        else if(guessval < realvalue){
        	ni.innerHTML =" That is too low";
        }
        else if(guessval === realvalue){
        	ni.innerHTML = "You got it!";
        }

        } <!--/if-->


}