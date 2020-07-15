var express 	= require("express"),
    app 		= express(),
    bodyParser 	= require("body-parser"),
    mongoose 	= require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true});


//schema setup

var campgroudSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroudSchema);

// Campground.create(
// {
// 	name: "Kharghar Hills",
// 	image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402__340.jpg",
// 	description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"

// },
// 	function(err, campground){
// 	if (err){
// 		console.log(err);
// 	} else {
// 		console.log("Newly Created Campground: ");
// 		console.log(campground);
// 	}
// });


app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});
// NEW -- Show form to create new campground
app.get("/campgrounds/new",function(req, res){
	res.render("new.ejs")
});
// INDEX -- Show all campgrounds
app.get("/campgrounds", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index",{campgrounds:allCampgrounds});
		}
	});
});

// CREATE -- Add new campground to DB
app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc}
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// Redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
	
});
// SHOW -- Shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			//render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});	
});

app.listen(3000, function(){
	console.log("YelpCamp Has Started!")
});