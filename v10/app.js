var express 		= require("express"),
    app 			= express(),
    bodyParser 		= require("body-parser"),
    mongoose 		= require("mongoose"),
	passport		= require("passport"),
	LocalStrategy	= require("passport-local"),
	methodOverride	= require("method-override"),
	Campground		= require("./models/campground"),
	Comment			= require("./models/comment"),
	User			= require("./models/user"),
	seedDB			= require("./seeds");

var	commentRoutes		= require("./routes/comments"),
	campgroundsRoutes	= require("./routes/campgrounds"),
	indexRoutes			= require("./routes/index");

// seedDB();

// PASSPORT CONFIGURATION

app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

mongoose.connect("mongodb://localhost/yelp_camp_v9",{useNewUrlParser: true, useUnifiedTopology: true});


app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// requiring routes

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundsRoutes);

app.listen(3000, function(){
	console.log("YelpCamp Has Started!")
});