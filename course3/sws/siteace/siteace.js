

Websites = new Mongo.Collection("websites");
Userwords = new Mongo.Collection("userwords");

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

Router.route('/ends/:keyword', function () {
	console.log("******");
	console.log(this.params.keyword);
  this.render('navbar', {
    to:"navbar"
  });
  this.render('search_list', {
    to:"search_list" ,
    data:function(){
    	var keywords = this.params.keyword;
    	console.log("passed "+keywords);
    	var filtered = Websites.find({"description":{$regex: keywords}});

    	console.log(filtered.count());
      return filtered;   
  }
});
},
{
	name: 'search.show'
},
{where:"server"});





if (Meteor.isClient) {

	/////
	// template helpers 
	/////

	Session.set("imageLimit", 8);
	lastScrollTop = 0; 
	$(window).scroll(function(event){
	// test if we are near the bottom of the window
	if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
  	// where are we in the page? 
  		var scrollTop = $(this).scrollTop();
  		// test if we are going down
  		if (scrollTop > lastScrollTop){
    // yes we are heading down...
  		 Session.set("imageLimit", Session.get("imageLimit") + 4);
  		}

  		lastScrollTop = scrollTop;
		}
    
		})

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({}, {sort:{rating:-1}, limit:Session.get("imageLimit")});

		}

	});

	Template.recommend_list.helpers({
		websites:function(){
			
			
			var result = Userwords.findOne({_id: Meteor.userId()});
			if(result){

				words = result.words;

			}else{
				return [];
			}
			var total = words.length-1;
			if(words.length <= 1)
			{
				webs = Websites.find({"description":{$regex: words[0]}});
			} 
			else{
				if(words.length <=2)
				{
					var webs = Websites.find({"$or": [{"description":{$regex: words[0]}}, {"description":{$regex: words[1]}}]});
				}
				else{
					var webs = Websites.find({"$or": [{"description":{$regex: words[total]}}, {"description":{$regex: words[total-1]}},{"description":{$regex: words[total-2]}}]});
				}
			}

			
				
			return webs;
		}
	});

	Template.search_list.helpers({
		websites:function(){
			return this;

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
	Template.search_form.events({

		"submit .js-search-website-form":function(event){

			var keyword = event.target.keywords.value;
			if(Userwords.findOne({_id: Meteor.userId()})){

				if (Userwords.findOne({"words": keyword})){ 

				console.log("not updated"); 
			}

				else{

					Userwords.update({_id:Meteor.userId()}, {$push:{words: keyword}});
					console.log("update the newword");
					
				}
			}
			else{
				Userwords.insert({_id: Meteor.userId(), words:[keyword]});

			}
			console.log(Userwords.findOne({_id:Meteor.userId()}).words);
			console.log("here:"+keyword);
			event.preventDefault();
			window.open(Router.url('search.show',{keyword:keyword},{}));
			

		}
	}
		);

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
			$("#"+website_id)[0].reset();
			$("#"+website_id).text("upvote:"+rating);
			return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("down voting website with id "+website_id);
			var rating = Websites.findOne({_id: website_id}).norating;
			rating = rating + 1;
			Websites.update({_id:website_id}, {$set:{norating:rating}});
			console.log(Websites.findOne({_id:website_id}).norating);
			// put the code in here to remove a vote from a website!
			$("#down"+website_id)[0].reset();
			$("#down"+website_id).text("downvote:"+rating);
			return false;// prevent the button from reloading the page
		},

		"click .detail":function(event){

			$("#detail_information").modal('show');
			

		}
	});

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){

			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;

			Meteor.call('geturl', url, function (err, res) { 
				console.log(res); 
				});

			console.log("hello world");
			

			return false;

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

	Meteor.methods({
		geturl: function(url){
			var result = extractMeta(url);
			console.log(result);
			if(!result.title){
				result.title = url;
				result.description = "There is no description on this website";
			}
			Websites.insert({
    		title: result.title, 
    		url:result.url, 
    		description:result.description, 
    		createdOn:new Date(), 
    		rating:0,
    		norating:0,
    		comments:[{author: "aa", content: "blabla", createdBy: new Date()},{author: "bb", content: "blabla", createdBy: new Date()} ]
    	});
			return(result);
		}
	});

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
  }

  );
}
