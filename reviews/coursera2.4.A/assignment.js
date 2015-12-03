// Code for Animals web site

function showTemplate(template, templateData){
    var html = template(templateData);
    $('#content').html(html);
}

$(document).ready(function(){

    // Compile Templates
    var classTemplate = Handlebars.compile($("#class-template").html());
    var speciesTemplate = Handlebars.compile($("#species-template").html());
    var photoTemplate = Handlebars.compile($("#photo-template").html());

    //Navigation tabs
    var html = classTemplate(animals);
    $('#tabMenu').html(html);

    var classIndex = 0;
    showTemplate(speciesTemplate,animals.class[classIndex]);

    // On click on a tab

    $(".tab-link").click(function () {

        $(".nav-tabs .active").removeClass("active");
        $(this).closest('li').addClass("active");

        classIndex = $(this).data("id");
        showTemplate(speciesTemplate,animals.class[classIndex]);

        // When the user click on a photo, we display it alone
        $(".crop-img").click(function(){
            var photo = {};
            photo.src = $(this).attr("src");
            photo.name = $(this).data("name");
            photo.description = $(this).data("description");
            showTemplate(photoTemplate,photo);
        });

    });





});