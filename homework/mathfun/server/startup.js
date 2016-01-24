

if (Meteor.isServer) {
  Meteor.startup(function () {

  	

  	if (!Mathfuns.findOne()){
  		
  		for(var i=1; i<=5; i++){
  			Mathfuns.insert({id: i, fun_name: 'N='+i });
  		}
  		
    }

    if(!Stats.findOne()){

    	for(var i=1; i<=12; i++){
    		var month = '2015-12-'
        if(i<10){
          month = month+'0'+i;
        }
        else{
          month = month+i;
        }
    		for(var j=1; j<=5; j++){
    			Stats.insert({id:j, month: month, fun_name: 'N='+j, count: Math.floor((Math.random() * 100) + 1), label:"N="+j});
    		}
    	}
    }

    if(!Nodes.findOne()){
    	for(var i=1; i<=5; i++){
    		Nodes.insert({id:i, label:'N='+i});
    		for(var j=i+1; j<=5; j++){
    			Edges.insert({from:i, to:j, value: Math.floor((Math.random() * 50) + 1)});
    		}
    	}
    }




  });

  Meteor.methods({

    updateStats:function(datapara){
      console.log(datapara);
      var temp = Stats.findOne({id: datapara});
      Stats.update({_id:temp._id},{$set:{value: temp.count+1}});
      
      },

    insertEdge:function(newitem){
      Edges.insert({from:newitem.from, to:newitem.to, value:1});
      
      },
    
  
    updateEdge: function(newitem){
      Edges.update({_id:newitem.id},{$set:{value: newitem.value}});
      
    }
  }
    );



  Meteor.publish("stats", function(){
    if(this.userId){
          return Stats.find();
        }
  });

  Meteor.publish("mathfuns", function(){
    if(this.userId){
          return Mathfuns.find();
        }
  });

  Meteor.publish("nodes", function(){
    if(this.userId){
          return Nodes.find();
        }
  });

  Meteor.publish("edges", function(){
    if(this.userId){
          return Edges.find();
        }
  });


  Meteor.publish("users", function(){
    if(this.userId){
      return Meteor.users.find();
    }
  })


}