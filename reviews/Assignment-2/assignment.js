$(document).ready(function () {
  
  var modalTemplate, photoGridTemplate, slideshowTemplate, albumTemplate;
  
  modalTemplate = Handlebars.compile($('#modal-template').html());
  $('#animal-modals').html(modalTemplate(animals));
  
  photoGridTemplate = Handlebars.compile($('#photo-grid-template').html());
  $('#photo-grid').html(photoGridTemplate(animals));
  
  slideshowTemplate = Handlebars.compile($('#slideshow-template').html());
  $('#slideshow').html(slideshowTemplate(animals));
  
  albumTemplate = Handlebars.compile($('#album-template').html());
  $('#album').html(albumTemplate(animals));
  
  $('div.item:first-child').addClass('active'); // adds active class to first carousel image.

});