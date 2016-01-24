console.log("starup run");


  // This code only runs on the server
Meteor.publish("news", function () {
return News.find();
  });

Meteor.methods({
    addInsert:function(par){
            News.insert({
                title:par.p1,
                image_src: par.p2,
                description: par.p3,
                createdOn: new Date()
            });
        },

    deleteItem:function(id){
        News.remove({_id:id});
    }
        
    }
    );

Meteor.startup(function(){
if (!News.findOne()){

		console.log("run on server");

    	console.log("No websites yet. Creating starter data.");
    	  News.insert({
    		title:"Micky Mouse", 
    		image_src:"MickyMouse.jpeg", 
    		description:"Mickey Mouse is a funny animal cartoon ",
    		//character and the official mascot of The Walt Disney Company. 
    		//He was created by Walt Disney and Ub Iwerks at the Walt Disney Studios in 1928. 
    		//An anthropomorphic mouse who typically wears red shorts, large yellow shoes, and white gloves, 
    		//Mickey has become one of the most recognizable cartoon characters in the world.", 
    		createdOn:new Date()
    		
    	});
    	 News.insert({
    		title:"Orca", 
    		image_src:"orca.jpeg", 
    		description:"Wild killer whales are not considered ",
    		//a threat to humans,but there have been cases of captive orcas killing or injuring 
    		//their handlers at marine theme parks.[14] Killer whales feature strongly in the 
    		//mythologies of indigenous cultures, with their reputation ranging from being 
    		//the souls of humans to merciless killers.", 
    		createdOn:new Date()
    		
    	});
    	 News.insert({
    		title:"Panda", 
    		image_src:"panda.jpeg", 
    		description:"The giant panda lives in a few mountain ranges in central China,", 
    		//mainly in Sichuan province, but also in neighbouring provinces, namely Shaanxi 
    		//and Gansu.[7] As a result of farming, deforestation, and other development, 
    		//the giant panda has been driven out of the lowland areas where it once lived.", 
    		createdOn:new Date()
    		
    	});
}
}
)

