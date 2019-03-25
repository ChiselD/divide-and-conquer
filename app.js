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
// 	name: "glass bottle",
// 	category: "glass",
// 	color: "white",
// 	notes: "Notes about glass bottles here"
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
	res.render("index");
});

// NEW ROUTE
app.get("/trash/new", function(req, res) {
	res.render("new");
});

// CREATE ROUTE
app.post("/trash", function(req, res) {
	res.redirect("/trash");
});

// SHOW ROUTE
app.get("/trash/:id", function(req, res) {
	res.render("show");
});

// EDIT ROUTE
app.get("/trash/:id/edit", function(req, res) {
	res.render("edit");
});

// UPDATE ROUTE
app.put("/trash/:id", function(req, res) {
	res.redirect("/trash/" + req.params.id);
});

// DELETE ROUTE
app.delete("/trash/:id", function(req, res) {
	res.redirect("/blogs");
});



app.listen(port, process.env.IP, function() {
	console.log("Server started, listening on port " + port);
});

//////////////////////