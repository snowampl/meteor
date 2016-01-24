
if (Meteor.isServer){
	Meteor.startup(function(){
		if (!Disease.findOne()){
		console.log("no data from filesystem");
		// pull in the NPM package 'fs' which provides
		// file system functions
		var fs = Npm.require('fs');
		// get a list of files in the folder private/jsonfiles, which
	
		// iterate the files, each of which should be a 
		// JSON file containing song data.
		var inserted_disease = 0;
		
		//for (var i=0;i<1; i++){

		
		 	// in case the file does not exist, put it in a try catch
		 	try{
		 		//var song = JSON.parse(Assets.getText('./assets/app/result_data.txt'));
		 		// now flatten the rhythm and tonal features
		 		// into a single set of properties
		 		var data = Assets.getText('result_data.txt');
		 		var dataset = data.split('\n');
		 		console.log(dataset[0]);
		 		console.log(dataset.length);
		 		for(var i=0; i< dataset.length; i++){
		 			var dis = dataset[i].split(',');
		 			var disjson = {};
		 			disjson.year = dis[0];
		 			disjson.zipcode = dis[1];
		 			disjson.cause = dis[2];
		 			disjson.count = parseInt(dis[3]);
		 			Disease.insert(disjson);
		 			inserted_disease++;
		 		}

		 		
		 	}catch (e){
		 		console.log("error parsing file ");
		 	}
		
		console.log("Inserted "+inserted_disease+" record");
	}
	else
	{
		console.log("there are data in database");
	}
	});
	
	Meteor.publish("disease", function(){
		return Disease.find({});
	})
}
