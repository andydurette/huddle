/*const express = require("express");
const isAuthenticated = require("../isAuthenticated");
const passport = require("../../config/authConfigLocal");
const yelp = require("../../api/yelp");


apiRoutes.post("/api/search/venues", isAuthenticated, async function(req, res){
	let location = req.body.location;
	let term = req.body.term;
	let response;
	if (!term || term.length < 1) {
		console.log("request without term");
		response = await yelp.searchVenueByLocation(location);
	} else {
		console.log("request with term");
		response = await yelp.searchVenueByLocationAndTerm(location, term);
	}
	let results =req.body.business;
	console.log("Sending the response");
	res.json(results);
});


apiRoutes.get("/api/venues/:id", isAuthenticated, async function(req, res){
	let businessId = req.params.id;
	let response = await yelp.getVenueDetail(businessId);
	res.json(response.data);
});*/