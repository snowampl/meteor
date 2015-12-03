// put your javascript code here

var albums_template, photos_template, photo_template, slideshow_template, filterdata;

// variables to store the current displayed album and photo
//var current_album = animals.class[0];
//var current_photo = current_album.animals[0];

// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(template, data){
	var html    = template(data);
	$('#content').html(html);
}



// document read gets called when the whole document
// is loaded, so we put most of the code that needs to run
// in here
$(document).ready(function(){

	var source   = $("#animalCategory-template").html();
	albums_template = Handlebars.compile(source);
	
	
	source   = $("#animals-template").html();
	photos_template = Handlebars.compile(source);

	source   = $("#animals2-template").html();
	photos2_template = Handlebars.compile(source);
	
	source   = $("#photo-template").html();
	photo_template = Handlebars.compile(source);

	source = $("#filter-template").html();
	filter_template = Handlebars.compile(source);
	
	current_album = animal.class[0].animals;
	/*source   = $("#slideshow-template").html();
	slideshow_template = Handlebars.compile(source); */

	// 

	$("#albums-tab").click(function () {


		showTemplate(albums_template, animal.class);

		$(".nav-tabs .active").removeClass("active");
		
		$("#albums-tab").addClass("active");

		

		$(".album-thumbnail").click(function (){

			var index = $(this).data("id");
			current_album = animal.class[index].animals;
			showTemplate(photos_template, current_album);

			$(".photo-thumbnail").click(function (){

				var index = $(this).data("id");

				current_photo = current_album[index];
				//console.log(current_photo.name);
			
				showTemplate(photo_template, current_photo);


			
		});
			
		});
	})

	$("#photos-tab").click(function () {
		
		
		showTemplate(photos2_template, current_album);

		
		$(".nav-tabs .active").removeClass("active");
		
		$("#photos-tab").addClass("active");

		$(".photo-thumbnail").click(function (){
			
			var index = $(this).data("id");

			
			current_photo = current_album[index];
			
			
			showTemplate(photo_template, current_photo);
		});
	});


	$("#albums-tab").click();

	$('#searchbox').keypress(function (e) {

	   filterdata = [];

      if (e.which == 13) {

       
        var search_text = $('#searchbox').val();

        console.log(animal.class.length);

    
        for(var i= 0; i< animal.class.length; i++){
        	for(var j=0; j< animal.class[i].animals.length; j++){
        		if (animal.class[i].animals[j].description.search(search_text)>-1){
        			var copiedobj = jQuery.extend({}, animal.class[i].animals[j]);
        			filterdata.push(copiedobj);
        			
        			
        		}
        	}
        }


       showTemplate(filter_template, filterdata);

        } <!--/if-->

       

        });
	});


  

	