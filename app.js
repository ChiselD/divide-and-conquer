const port = 8792;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");


// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));


// MONGOOSE/MODEL CONFIG



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



app.listen(port, process.env.IP, function() {
	console.log("Server started, listening on port " + port);
});

//////////////////////