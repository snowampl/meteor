
function showTemplate(template, data){
	var html    = template(data);
	$('#content').html(html);
}

function search_animal(search_text) {
    var results = [];
    for(var i = 0; i < animals.class.length; i ++){
        for (var j = 0; j < animals.class[i].animals.length; j ++){
            var name = animals.class[i].animals[j].name.toLowerCase();
            if (name.search(search_text) > -1) {
                    results.push(animals.class[i].animals[j]);
            }
        }
    }
    return {results: results};
}

// When document is ready (i.e. loaded) perform the following
$(document).ready(function(){

    // Compile handlebars templates
	var source   = $("#classes_template").html();
	classes_template = Handlebars.compile(source);
    source = $("#animals_template").html();
    animals_template = Handlebars.compile(source);
    source = $("#all_template").html();
    all_template = Handlebars.compile(source);
    source = $("#modal_template").html();
    modal_template = Handlebars.compile(source);
    source = $("#search_template").html();
    search_template = Handlebars.compile(source);
    
    // Classes page
	$(".classes").on("click", function (){
        console.log("Retrieving classes of animals");
        $("#search-container").empty();
        showTemplate(classes_template, animals);
		$(".nav-tabs .active").removeClass("active");
		$(".classes_tab").addClass("active");
        $(".breadcrumb").empty();
        $(".breadcrumb").append("<li>Classes</li>");
    });

    // Animals page
    $("#content").on("click", ".animals", function (){
        console.log("Retrieving animals for class "+ animals.class[$(this).data("id")].name);
        $("#search-container").empty();
        showTemplate(animals_template, animals.class[$(this).data("id")]); 
		$(".nav-tabs .active").removeClass("active");
		$(".classes_tab").addClass("active");
        $(".breadcrumb").empty();
        $(".breadcrumb").append("<li>Classes</li>");
        $(".breadcrumb").append("<li>"+ animals.class[$(this).data("id")].name + "</li>");
    });
    
    // All page
    $(".all").on("click", function (){
        console.log("Retrieving all animals");
        $("#search-container").empty();
        showTemplate(all_template, animals); 
		$(".nav-tabs .active").removeClass("active");
		$(".all").addClass("active");
        $(".breadcrumb").empty();
        $(".breadcrumb").append("<li>All</li>");
    });
 
     // Display a modal when clicking on an single animal image
    $("#content").on( "click", ".single_animal", function (){
        var idx_class = $(this).data("id-class");
        var idx_animal = $(this).data("id-animal");
        console.log("Clicked on " + animals.class[idx_class].animals[idx_animal].name);
        var html = modal_template({src: animals.class[idx_class].animals[idx_animal].image1});
        $('#modal-container').html(html);
        $("#image_modal").modal('show');
    });
    
    // Display search box and results, if any
    $(".search").on("click", function(){
        console.log("Called search page");
        $("#content").empty();
        var html = search_template({});
        $("#search-container").html(html);
		$(".nav-tabs .active").removeClass("active");
		$(".search").addClass("active");
        $(".breadcrumb").empty();
        $(".breadcrumb").append("<li>Search</li>");        
    });
    
    $("#search-container").on("keypress", "#searchbox", function (e) {
        if (e.which == 13) {
            var search_text = $('#searchbox').val();
            if (search_text != "") {
                console.log("Searching for \"" + search_text + "\"");
                var search_results = search_animal(search_text.toLowerCase());
                var html = search_template(search_results);
                $("#search-container").html(html);
            }
            $(".breadcrumb").empty();
            $(".breadcrumb").append("<li>Search</li>");
            $(".breadcrumb").append("<li>" + search_text + "</li>"); 
        }
    });
    
	// Begin by selecting the Classes page
	$(".classes").click();


});