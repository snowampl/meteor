
Stats = new Mongo.Collection("stats");
Mathfuns = new Mongo.Collection("mathfuns");
Nodes = new Mongo.Collection("nodes");
Edges = new Mongo.Collection("edges");

var visjsobj;

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('navbar');
  this.render('home');
});
Router.route('/math', function () {
  this.render('navbar')
  this.render('math_function');
});
Router.route('/users', function () {
  this.render('navbar')
  this.render('users_behaviour');
});


if (Meteor.isClient) {
  // counter starts at 0

  Meteor.subscribe("stats");
  Meteor.subscribe("mathfuns");
  Meteor.subscribe("nodes");
  Meteor.subscribe("edges");

  Session.setDefault('feature', 1);

  Template.math_function_controls.helpers({
    // returns an array of the names of all features of the requested type
    mathfunction : function(){
      
      return Mathfuns.find({});
    },
  });


  Template.math_function_controls.events({
    // event handler for when user changes the selected
    // option in the drop down list
    "change .js-select-function":function(event){
      event.preventDefault();
      var feature = parseInt($(event.target).val());
     
      var from = parseInt(Session.get('feature'));
      if(from != 0){
          var to = feature;
          if(from!=to){
            var temp = Edges.findOne({from:from, to:to});
            
            if(temp){
              var newvalue = temp.value+1;
              Meteor.call('updateEdge', {id:temp._id, value:newvalue}, function(err, res){
                              if(err){
                                alert("updateEdge some error happened");
                              }
                            });

              

            }
            else{
              Meteor.call('insertEdge', {from:from, to:to, value:1}, function(err, res){
                              if(err){
                                alert("insertEdge some error happened");
                              }
                            });
              
            }
          }
      }
      Session.set("feature", feature);
    }, 

    "click .js-show-graph":function(event){
      event.preventDefault();
      var feature = Session.get('feature');
      Meteor.call('updateStats', feature, function(err, res){
                              if(err){
                                alert("updateStats some error happened");
                              }
                            });
      initFun3d(feature);
      
    }  
    
  }); 

  Template.users_stats.events({
    "click .js-show-users":function(event){
        initUserstats();
    }, 
    "click .js-show-network":function(event){
      initFunstats();

    }
  });

}




function initFun3d(feature){
  if (visjsobj != undefined){
    //visjsobj.destroy();
    delete visjsobj;
  }
  var data = new vis.DataSet();
    // create some nice looking data with sin/cos
    var counter = 0;
    var steps = 50;  // number of datapoints will be steps*steps
    var axisMax = 314;
    var axisStep = axisMax / steps;
    for (var x = 0; x < axisMax; x+=axisStep) {
        for (var y = 0; y < axisMax; y+=axisStep) {
            var value = (Math.sin(x*feature/50) * Math.cos(y*feature/50) * 50 + 50);
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
    var container = document.getElementById('visjs');
    visjsobj = new vis.Graph3d(container, data, options);
}

function initUserstats(){

  if (visjsobj != undefined){
    delete visjsobj;
  }
 
  var groups = new vis.DataSet();
  for(var i=1; i<=5; i++){
    var temp ='N='+i;
    groups.add({id:temp, content:temp,
      options: {
            drawPoints: {
                style: 'circle',// square, circle
                size: i
            },
            shaded: {
                orientation: 'bottom' // top, bottom
            }
        }
    });
  }
 
  var item = Stats.find({}).fetch();
  var data_array = new Array();

  var options = {
    width:  '500px',
    height: '552px',
    start: '2015-12-01',
    end: '2015-12-12',
    drawPoints:true
    
    
  };

  for(var i=0; i< item.length; i++){
    var label = {
       content: item[i].label,
      xOffset: 20,
      yOffset: 20
    };
    data_array[i] = {x: item[i].month,y:parseInt(item[i].count), group:item[i].fun_name, label:label};
  } 
  dataset = new vis.DataSet(data_array);  
 
  var container = document.getElementById('visjs');
  if(container.hasChildNodes()){
  container.removeChild(container.firstChild);}
  visjsobj = new vis.Graph2d(container, dataset, groups, options);
  
}

function initFunstats(){
 if (visjsobj != undefined){
    //visjsobj.destroy();
    delete visjsobj;
  }

  var nodes = new vis.DataSet();
  var edges = new vis.DataSet();
  var node_item = Nodes.find({}).fetch();
  var edge_item = Edges.find({}).fetch();

  for(var i=0; i< node_item.length; i++){
    nodes.add({id:node_item[i].id, label: node_item[i].label});
  }

   for(var i=0; i< edge_item.length; i++){
    edges.add({from:edge_item[i].from, to:edge_item[i].to, value:edge_item[i].value});
  }

  var container = document.getElementById('visjs');

  var data ={
    nodes: nodes,
    edges: edges
  };

  var options={
    autoResize: true,
    width:  '500px',
    height: '552px'
 
  };
  visjsobj = new vis.Network(container, data, options);


}



