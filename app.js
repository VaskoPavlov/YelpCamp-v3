var express = require("express");
var mongoose = require("mongoose"); // louli here, I added this line
var app = express();
var bodyParser = require("body-parser");
var Campground = require("./models/campground");
var module = require("module");
var path = require("path");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
// app.set('views', path.join("models", 'v3/models'));

mongoose.connect("mongodb://localhost:27017/yelpcamp_v3", { // louli here, I pasted these lines from your previous version changing the database name
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// var campgrounds = [
// 		{name:"Salmon Creek", image:"https://www.photosforclass.com/download/px_699558"},
// 		{name:"Granite Hill", image:"https://www.photosforclass.com/download/px_1239422"},
// 		{name:"Mountain Goat's Rest", image:"https://www.photosforclass.com/download/px_2108709"}];
	// 	{name:"Salmon Creek", image:"https://www.photosforclass.com/download/px_699558"},
	// 	{name:"Granite Hill", image:"https://www.photosforclass.com/download/px_1239422"},
	// 	{name:"Mountain Goat's Rest", image:"https://www.photosforclass.com/download/px_2108709"},
	// 	{name:"Salmon Creek", image:"https://www.photosforclass.com/download/px_699558"},
	// 	{name:"Granite Hill", image:"https://www.photosforclass.com/download/px_1239422"},
	// 	{name:"Mountain Goat's Rest", image:"https://www.photosforclass.com/download/px_2108709"}
	// ];

// louli here, I added the lines below


// louli here, I added the lines below to save a campground to the database, thus creating yelpcamp_v2 on mongo, then commented them, so those campgrounds won't be created each time you restart the application

// Campground.create(
//      {
// 	    name:"Mountain Goat's Rest",
// 		image:"https://www.photosforclass.com/download/px_2108709",
// 		description: "This is a huge goat's rest, no bathrooms. No water. Beautiful mountain rest!"
// 	 },
//      function(err, campground){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED CAMPGROUND: ");
//           console.log(campground);
//       }
//     });
app.get("/",function(req, res){
	res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
	//Get all campgrounds from DB
	Campground.find(function(err, allCampgrounds){
		if (err){
			console.log(err);
		} else {
			// res.render("/campgrounds", {campgrounds: allCampgrounds});		}
			res.render("index", {campgrounds: allCampgrounds});		
		}
	});
});

// CREATE - add new campground to the database
app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name:name, image:image, description: desc}
	//Create a new capmground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

// NEW -show form to create new campground
app.get("/campgrounds/new", function(req, res){
	// res.render("/views/new");
	res.render("new");
});

//SHOW - shows more info about one campground
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
app.listen(3000, process.env.IP, function(){
    console.log("The YelpCamp Server has started!!!");
});	