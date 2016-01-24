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
      initDateVis3d();
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
function initDateVis3d(){
  // clear out the old visualisation if needed
  /*
  if (visjsobj != undefined){
    visjsobj.destroy();
  }
  
  var ind = 0;
  var diseases = Disease.find({}).fetch();
  var allrecord = diseases.length;
  console.log(diseases.length);
  var groups = _.groupBy(diseases, function(value){
    return value.year + '#' + value.cause;
  });

  var data = _.map(groups, function(group){
    return{
      year: group[0].year,
      cause: group[0].cause,
      count: _.pluck(group, 'count')
    }
  });
  console.log(data.length);
  var counter = 0;
  var item = new vis.DataSet();
  for(var i = 0; i< data.length; i++){
    var total = 0;
    for(var j = 0; j< data[i].count.length; j++){
      total = total + data[i].count[j];
    }
    item.add({x: parseInt(data.year), y: counter++, z: total});
  }
  */
  if (visjsobj != undefined){
    visjsobj.destroy();
  }
  
  var data = new vis.DataSet();
    // create some nice looking data with sin/cos
    var counter = 0;
    var steps = 50;  // number of datapoints will be steps*steps
    var axisMax = 314;
    var axisStep = axisMax / steps;
    for (var x = 0; x < axisMax; x+=axisStep) {
        for (var y = 0; y < axisMax; y+=axisStep) {
            var value = (Math.sin(x/50) * Math.cos(y/50) * 50 + 50);
            data.add({id:counter++,x:x,y:y,z:value,style:value});
        }
    }
  var options = {
        width:  '500px',
        height: '552px',
        style: 'surface',
        showPerspective: true,
        showGrid: true,
        showShadow: false,
        keepAspectRatio: true,
        verticalRatio: 0.5
    };

 
 var container = document.getElementById('visjs');
 //var visjsobj = new vis.Graph3d(container, item, options);
 var visjsobj = new vis.Graph3d(container, data, options);
 visjsobj.fit();
  /*
  var data = new vis.DataSet();
    // create some nice looking data with sin/cos
    var counter = 0;
    var steps = 50;  // number of datapoints will be steps*steps
    var axisMax = 314;
    var axisStep = axisMax / steps;
    for (var x = 0; x < axisMax; x+=axisStep) {
        for (var y = 0; y < axisMax; y+=axisStep) {
            var value = (Math.sin(x/50) * Math.cos(y/50) * 50 + 50);
            data.add({id:counter++,x:x,y:y,z:value,style:value});
        }
    }

    // specify options
    var options = {
        width:  '500px',
        height: '552px',
        style: 'surface',
        showPerspective: true,
        showGrid: true,
        showShadow: false,
        keepAspectRatio: true,
        verticalRatio: 0.5
    };

    // Instantiate our graph object.
    var container = document.getElementById('visualization');
    var graph3d = new vis.Graph3d(container, data, options);
  */

  /*
  for(var i=0; i< key.length; i++){
    var date=key[i]+"-01-01";
    var total = 0;
    for(var j=0; j<value[i].length;j++){
      total += value[i][j].count;
    }
    total = total;
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
  /*
  var dataset = new vis.DataSet(items);
 
  // set up the data plotter
  var options = {
    start:'2005-01-01',
    end:'2013-01-01',
    
  };
  // get the div from the DOM that we are going to 
  // put our graph into 
  var container = document.getElementById('visjs');
  // create the graph
  visjsobj = new vis.Graph2d(container, dataset, options);
  // tell the graph to set up its axes so all data points are shown
  visjsobj.fit();*/
}

/*
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
  for(var i=0; i< key.length; i++){
    var date=key[i]+"-01-01";
    var total = 0;
    for(var j=0; j<value[i].length;j++){
      total += value[i][j].count;
    }
    total = total;
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
  
  var dataset = new vis.DataSet(items);
 
  // set up the data plotter
  var options = {
    start:'2005-01-01',
    end:'2013-01-01',
    
  };
  // get the div from the DOM that we are going to 
  // put our graph into 
  var container = document.getElementById('visjs');
  // create the graph
  visjsobj = new vis.Graph2d(container, dataset, options);
  // tell the graph to set up its axes so all data points are shown
  visjsobj.fit();
} */

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


