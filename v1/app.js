var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
		{name: "Salmon Creek", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e50744075277bd6914cc1_340.jpg"},
		{name: "Kharghar Hills", image: "https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e50744075277bd6914cc1_340.jpg"},
		{name: "Parski Hill", image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e50744075277bd6914cc1_340.jpg"}
		
	]

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds/new",function(req, res){
	res.render("new.ejs")
});

app.get("/campgrounds", function(req, res){
	
	
	res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.listen(3000, function(){
	console.log("YelpCamp Has Started!")
});