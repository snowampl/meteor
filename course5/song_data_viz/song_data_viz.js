Disease = new Mongo.Collection("disease");
var visjsobj;

if (Meteor.isClient) {
  
 Meteor.subscribe("disease");

////////////////////////////
///// event handlers for the viz control form
////////////////////////////

  Template.disease_viz_controls.events({
    // event handler for when user changes the selected
    // option in the drop down list
    "click .js-show-stats":function(event){
      event.preventDefault();
      initStatsvis()
    }, 
    // event handler for when the user clicks on the 
    // blobs button
     "click .js-show-map":function(event){
      event.preventDefault();
      initMapVis();
    }, 
    // event handler for when the user clicks on the 
    // timeline button
     "click .js-show-timeline":function(event){
      event.preventDefault();
      initDateVis();
    }, 
  }); 
}



////////////////////////////
///// functions that set up and display the visualisation
////////////////////////////


// function that creates a new timeline visualisation
function initDateVis(){
  // clear out the old visualisation if needed
  if (visjsobj != undefined){
    visjsobj.destroy();
  }
  var items = new Array();
  var ind = 0;
  var diseases = Disease.find({}).fetch();
  var allrecord = diseases.length;
  console.log(diseases.length);
  var sumresult = _.groupBy(diseases, function(data){return data.year});
  var key = _.keys(sumresult);
  var value = _.values(sumresult);
  console.log(key);
  for(var i=0; i< key.length-1; i++){
    var date= key[i]+"-01-01";
    var total = 0;
    for(var j=0; j<value[i].length;j++){
      total += value[i][j].count;
    }
  ;
    console.log(date);
    console.log(total);
    items[ind] = {
        x: date, 
        y: total 
        // slighlty hacky label -- check out the vis-label
        // class in song_data_viz.css 
        //label:{content:date, className:'vis-label', xOffset:0}, 
      };
      ind ++ ;

  }
  
  //var dataset = new vis.DataSet(items);
 
  // set up the data plotter
  var options = {
    start:'1999-01-01',
    end: '2003-01-01'
    
    
  };
  // get the div from the DOM that we are going to 
  // put our graph into 
  var container = document.getElementById('visjs');
  // create the graph
  visjsobj = new vis.Graph2d(container, items, options);
  // tell the graph to set up its axes so all data points are shown
  visjsobj.fit();
}


/*
// function that creates a new blobby visualisation
function initBlobVis(){
  // clear out the old visualisation if needed
  if (visjsobj != undefined){
    visjsobj.destroy();
  }
  // find all songs from the Songs collection
  var songs = Songs.find({});
  var nodes = new Array();
  var ind = 0;
  // iterate the songs, converting each song into 
  // a node object that the visualiser can understand
    songs.forEach(function(song){
      // set up a label with the song title and artist
     var label = "ind: "+ind;
     if (song.metadata.tags.title != undefined){// we have a title
          label = song.metadata.tags.artist[0] + " - " + 
          song.metadata.tags.title[0];
      } 
      // figure out the value of this feature for this song
      var value = song[Session.get("feature")["type"]][Session.get("feature")["name"]];
      // create the node and store it to the nodes array
        nodes[ind] = {
          id:ind, 
          label:label, 
          value:value,
        }
        ind ++;
    })
    // edges are used to connect nodes together. 
    // we don't need these for now...
    edges =[
    ];
    // this data will be used to create the visualisation
    var data = {
      nodes: nodes,
      edges: edges
    };
    // options for the visualisation
     var options = {
      nodes: {
        shape: 'dot',
      }
    };
    // get the div from the dom that we'll put the visualisation into
    container = document.getElementById('visjs');
    // create the visualisation
    visjsobj = new vis.Network(container, data, options);

}*/


