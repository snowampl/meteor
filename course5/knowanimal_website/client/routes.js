

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
 
  this.render('home');
});
Router.route('/news', function () {

  this.render('news');
});



// account config
/*
Accounts.onCreateUser(function (options, user) {
 user.roles = ['blogAuthor'];
 if (options.profile)
   user.profile = options.profile;
 return user;
});*/


if(Meteor.isClient){

	
	Meteor.subscribe("news");

	console.log("check from client");
	console.log(News.find({}).count());

	Template.news_item.helpers(
		{
			
			news_item:function(){
				console.log(News.find({}).count());
				return News.find({})
			}
		}
	);

	Template.news_item.events({
		"click .deleteevent":function(event){
			if(Meteor.user()._id=="w77Nno6eH7ir2o6cM"){
			var id = this._id;
			console.log(id);
			Meteor.call("deleteItem", id);}
			else{
				console.log("only admin can delete");
				alert("only Administror can delete");
			}

		},

		"click .newsimage":function(event){
			var link = this.title;
			var name = link.toLowerCase();
			var relink = '/blog/'+name;
			window.open(relink);
			
		}
	}
		);

	Template.news_form.events({
		"submit .js-save-news-form":function(event){
			var title = event.target.title.value;
			var src = event.target.src.value;
			var des = event.target.des.value;
			var par = {p1:title, p2:src, p3:des};
			Meteor.call('addInsert', par, function (err, res) { 
				console.log(res); 
				});
			return false;
		}
	}
		)
}