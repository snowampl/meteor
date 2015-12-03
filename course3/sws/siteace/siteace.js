

Websites = new Mongo.Collection("websites");

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('main', {
    to:"main"
  });
  });


Router.route('/websites', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('main', {
    to:"main"
  });
});


Router.route('/websites/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('detail', {
    to:"detail" ,
    data:function(){
    	var website_id = this.params._id
    	var last_element = Websites.findOne({_id:website_id});
    	
      return last_element;
    
  }
});
});






if (Meteor.isClient) {

	/////
	// template helpers 
	/////

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({}, {sort:{rating:-1}});

		}

	});

	Template.detail.helpers({
		elements: function(){
			
			return this;
		},
		comments: function(){
			return this.comments;
		}
	});


	/////
	// template events 
	/////

	Template.website_item.events({
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Up voting website with id "+website_id);
			var rating = Websites.findOne({_id: website_id}).rating;
			rating = rating + 1;
			Websites.update({_id:website_id}, {$set:{rating:rating}});
			console.log(Websites.findOne({_id:website_id}).rating);
			// put the code in here to add a vote to a website!
			$("#"+website_id).reset();
			$("#"+website_id).text(rating);
			return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Up voting website with id "+website_id);
			var rating = Websites.findOne({_id: website_id}).norating;
			rating = norating + 1;
			Websites.update({_id:website_id}, {$set:{norating:rating}});
			console.log(Websites.findOne({_id:website_id}).norating);
			// put the code in here to remove a vote from a website!
			$("#"+website_id).reset();
			$("#"+website_id).text(rating);
			return false;// prevent the button from reloading the page
		},

		"click .detail":function(event){

			$("#detail_information").modal('show');
			

		}
	})

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){

			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;
			var title = event.target.title.value;
			var description = event.target.description.value;
			if (Meteor.user()){
				Websites.insert({
					url:url,
					title:title,
					description:description,
					createdOn: new Date(),
					rating:0, 
					norating:0
				});
			}
			console.log("The url they entered is: "+url);

			
			//  put your website saving code in here!	

			return false;// stop the form submit from reloading the page

		}
	});

	Template.detail.events({
		"submit .js-submit-detail": function(event){
			var userid = this._id;
			var currentuser = Meteor.userId();
			var content = event.target.comments.value;
			console.log(userid);
			console.log(Meteor.userId());
			Websites.update({_id:userid}, {$push:{comments:{author: currentuser, content: content, createdBy: new Date()}}});

			return false;
		}
	})
}


if (Meteor.isServer) {
	// start up function that creates entries in the Websites databases.
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()){
    	console.log("No websites yet. Creating starter data.");
    	  Websites.insert({
    		title:"Goldsmiths Computing Department", 
    		url:"http://www.gold.ac.uk/computing/", 
    		description:"This is where this course was developed.", 
    		createdOn:new Date(), 
    		rating:0,
    		norating:0,
    		comments:[{author: "aa", content: "blabla", createdBy: new Date()},{author: "bb", content: "blabla", createdBy: new Date()} ]
    	});
    	 Websites.insert({
    		title:"University of London", 
    		url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
    		description:"University of London International Programme.", 
    		createdOn:new Date(),
    		rating:0,
    		norating:0,
    		comments:[{author: "aa", content: "blabla", createdBy: new Date()},{author: "bb", content: "blabla", createdBy: new Date()} ]
    	});
    	 Websites.insert({
    		title:"Coursera", 
    		url:"http://www.coursera.org", 
    		description:"Universal access to the world’s best education.", 
    		createdOn:new Date(),
    		rating:0,
    		norating:0,
    		comments:[{author: "aa", content: "blabla", createdBy: new Date()},{author: "bb", content: "blabla", createdBy: new Date()} ]
    	});
    	Websites.insert({
    		title:"Google", 
    		url:"http://www.google.com", 
    		description:"Popular search engine.", 
    		createdOn:new Date(),
    		rating:0,
    		norating:0,
    		comments:[{author: "aa", content: "blabla", createdBy: new Date()},{author: "bb", content: "blabla", createdBy: new Date()} ]

    	});
    }
  });
}
