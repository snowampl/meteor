News = new Mongo.Collection("news");

Blog.config({
  title: "Portfolio Website",

  rss: {
    title: 'My Portfolio Website',
    description: 'This is an example of a portfolio website'
  },

  comments: {
    disqusShortname: 'myshortname'
  }


});

News.allow({

	// we need to be able to update images for ratings.
	update:function(userId, doc){
		console.log("testing security on image update");
		if (Meteor.user()){// they are logged in
			return true;
		} else {// user not logged in - do not let them update  (rate) the image. 
			return false;
		}
	},

	insert:function(userId, doc){
		console.log("testing security on image insert");
		if (Meteor.user()){// they are logged in
			if (userId != doc.createdBy){// the user is messing about
				return false;
			}
			else {// the user is logged in, the image has the correct user id
				return true;
			}
		}
		else {// user not logged in
			return false;
		}
	}, 
	remove:function(userId, doc){
		if (Meteor.user()){// they are logged in
			if (userId != doc.createdBy){// the user is messing about
				return false;
			}
			else {// the user is logged in, the image has the correct user id
				return true;
			}
		}
		else {// user not logged in
			return false;
		}
	}
})






	

