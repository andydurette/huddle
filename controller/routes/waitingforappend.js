/*const express = require("express");
const isAuthenticated = require("../isAuthenticated");
const passport = require("../../config/authConfigLocal");
const yelp = require("../../api/yelp");
const weather = require("../../api/weather");
const Event = require("../model/classes/event");
let event = new Event();


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
});

apiRoutes.get("/api/venues/:id", isAuthenticated, async function(req, res){
	let businessId = req.params.id;
	let response = await yelp.getVenueDetail(businessId);
	res.json(response.data);
});

apiRoutes.get("/api/weather", isAuthenticated, async function(req, res){
	let location = req.body.location;
	let response;
	let breakPoint = [4, 12, 20, 28, 36];
	for (i in breakPoint){
	let response = await weather.weatherForcastbyLocation(location);
	if (moment(response.dt_txt[i]).format('l') === moment(event.getDate(eventId)).format('l')) {
		var temp = Math.round(response.list[breakPoint[i]].main.temp - 273.15 ) + " " + String.fromCharCode(176) + "C";
		var humidity = response.list[breakPoint[i]].main.humidity + "%";
		var icon = response.list[breakPoint[i]].weather[0].icon; 
		let results =[temp, humidity, icon];
		res.json(results);
	}
	else {
		console.log("The date you choose is not qualified for weather forcast!");
	}
	}
});
*/