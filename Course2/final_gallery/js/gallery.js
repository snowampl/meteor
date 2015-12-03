
/*
 *		This file contains the javascript code for our gallery
 */

// variables for all of the templates so we only have to compile
// them once on page load and can then use the same compiled 
// templates many times
var albums_template, photos_template, photo_template, slideshow_template;

// variables to store the current displayed album and photo
var current_album = gallery.albums[0];
var current_photo = current_album.photos[0];

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

	console.log("done");

	//
	// compile all of our templates ready for use
	//
	var source   = $("#albums-template").html();
	albums_template = Handlebars.compile(source);
	
	source   = $("#photos-template").html();
	photos_template = Handlebars.compile(source);
	
	source   = $("#photo-template").html();
	photo_template = Handlebars.compile(source);
	
	source   = $("#slideshow-template").html();
	slideshow_template = Handlebars.compile(source);

	// 
	//  clicking on the albums tab shows the 
	//  thumbnails of all the albums
	//
	$("#albums-tab").click(function () {

		console.log("done");

		showTemplate(albums_template, gallery);

		$(".nav-tabs .active").removeClass("active");
		
		$("#albums-tab").addClass("active");

		$(".album-thumbnail").click(function (){

			console.log("sub-done");
			
			
			var index = $(this).data("id");

			console.log(index);

			current_album = gallery.albums[index];

			
			showTemplate(photos_template, current_album);

			$(".photo-thumbnail").click(function (){
			
			var index = $(this).data("id");

			
			current_photo = current_album.photos[index];
			
			
			showTemplate(photo_template, current_photo);
		});
			
		});
	});

	// 

	//  clicking on the photos tab shows all of the 
	//  photos in the current album
	//
	$("#photos-tab").click(function () {
		
		
		showTemplate(photos_template, current_album);

		
		$(".nav-tabs .active").removeClass("active");
		
		$("#photos-tab").addClass("active");

		$(".photo-thumbnail").click(function (){
			
			var index = $(this).data("id");

			
			current_photo = current_album.photos[index];
			
			
			showTemplate(photo_template, current_photo);
		});
	});
	//
	
	
	$("#slideshow-tab").click(function () {
		
		showTemplate(slideshow_template, current_album);
		
		
		$(".nav-tabs .active").removeClass("active");
		
		$("#slideshow-tab").addClass("active");
	});

	
	$("#albums-tab").click();

});