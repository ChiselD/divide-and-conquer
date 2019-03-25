const port = 8792;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");


// APP CONFIG
mongoose.connect("mongodb://localhost/divconq", 
	{useNewUrlParser: true, useFindAndModify: false});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());


// MONGOOSE/MODEL CONFIG
const trashSchema = new mongoose.Schema({
	name: String,
	category: String,
	color: String,
	notes: String
});

const Trash = mongoose.model("Trash", trashSchema);


// TEST CREATION

// Trash.create({
// 	name: "plastic bottle",
// 	category: "packaging",
// 	color: "yellow",
// 	notes: "Notes about plastic bottles here"
// }, function(err, trash) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(trash);
// 	}
// });


// RESTFUL ROUTES

// SEARCH ROUTE (landing page)
app.get("/", function(req, res) {
	res.render("search");
});

// INDEX ROUTE
app.get("/trash", function(req, res) {
	Trash.find({}, function(err, trashes) {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {trash: trashes});
		}
	});
});

// NEW ROUTE
app.get("/trash/new", function(req, res) {
	res.render("new");
});

// CREATE ROUTE
app.post("/trash", function(req, res) {
	req.body.trash.notes = req.sanitize(req.body.trash.notes);
	Trash.create(req.body.trash, function(err, newTrash) {
		if (err) {
			console.log(err);
			console.log("Re-rendering new-trash form...");
			res.render("new");
		} else {
			res.redirect("/trash");
		}
	});
});

// SHOW ROUTE
app.get("/trash/:id", function(req, res) {
	Trash.findById(req.params.id, function(err, foundTrash) {
		if (err) {
			console.log(err);
			console.log("Redirecting to index page...");
			res.redirect("/trash");
		} else {
			res.render("show", {trash: foundTrash});
		}
	});
});

// EDIT ROUTE
app.get("/trash/:id/edit", function(req, res) {
	Trash.findById(req.params.id, function(err, foundTrash) {
		if (err) {
			console.log(err);
			console.log("Redirecting to index page...");
			res.redirect("/trash");
		} else {
			res.render("edit", {trash: foundTrash});
		}
	});
});

// UPDATE ROUTE
app.put("/trash/:id", function(req, res) {
	req.body.trash.notes = req.sanitize(req.body.trash.notes);
	Trash.findByIdAndUpdate(req.params.id, req.body.trash, function(err, updatedTrash) {
		if (err) {
			console.log(err);
			console.log("Redirecting to index...");
			res.redirect("/trash");
		} else {
			res.redirect("/trash/" + req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete("/trash/:id", function(req, res) {
	Trash.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			console.log(err);
			console.log("Redirecting to index...");
			res.redirect("/trash");
		} else {
			res.redirect("/trash");
		}
	});
});



app.listen(port, process.env.IP, function() {
	console.log("Server started, listening on port " + port);
});

//////////////////////