const express = require("express");
const isAuthenticated = require("../isAuthenticated");
const yelp = require("../../api/yelp");
const weather = require("../../api/weather");
const Event = require("../model/event");
const Venue = require("../model/venue");
import moment from "react-moment";



let event = new Event();
let venue = new Venue();

let apiRoutes = express.Router();


/*const callApi = async () => {
	try {
		const token = await getTokenSilently();
		console.log("token: ", token);
		const response = await fetch("https://dev-0ec6it0o.auth0.com/userinfo", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const responseData = await response.json();
		setShowResult(true);
		setApiMessage(responseData);
	} catch (error) {
		console.error(error);
	}
};*/

//search venue basing the type of sport and location  
apiRoutes.post("/api/venues/search", isAuthenticated, async function(req, res){
	let location = req.body.location;
	let term = req.body.term;
	if (!term || term.length < 1) {
		console.log("request without term");
		let data = await yelp.searchVenueByLocation(location);
		let results = data.business;
		console.log("Sending the response");
		res.json(results);
	} else {
		console.log("request with term");
		let data = await yelp.searchVenueByLocationAndTerm(location, term);
		let results = data.business;
		console.log("Sending the response");
		res.json(results);
	}
});

//get detail from select venue
apiRoutes.get("/api/venues/:businessId", isAuthenticated, async function(req, res){
	let businessId = req.params.id;
	let response = await yelp.getVenueDetail(businessId);
	res.json(response.data);
});


//add select venue to database
apiRoutes.post("/api/event/venue/add", isAuthenticated, async function(req, res){
	let businessId = req.params.id;
	let data =  await yelp.getVenueDetail(businessId);
	let name = data.business.name.replace("'","''");
	let yelpId = data.business.id;
	let lon = data.business.coordinates.longitude;
	let lat = data.business.coordinates.latitude;
	let city = data.business.location.city;
	let address = JSON.stringify(data.location);
	let website = data.business.url;
	let phone = data.business.phone;
	let results = await venue.addNew(name, yelpId, lon, lat, city, address, website, phone);
	console.log("Adding a venue to the databse");
	res.json(results);
});



//update selected venue to event page
apiRoutes.post("/api/event/venue/add", isAuthenticated, async function(req, res){
	let businessId = req.params.id;
	let data = await venue.getDetails(businessId);
	let eventId = req.params.event_id;
	let venueId = data.venue_id;
	let results = await event.updateEvent(eventId, venueId);
	res.json(results);
});


//delete venue from event and database
apiRoutes.delete("api/event/:venuesId", isAuthenticated, async (req, res) => {
	let eventId = req.params.event_id;
	let id = req.params.venue_id;
	let venueId = null;
	let data = await event.updateEvent(eventId, venueId);
	let results = await venue.delete(id);
	res.json(data, results);
});

apiRoutes.get("/api/weather", isAuthenticated, async function(req, res){
	let location = req.params.location;
	let eventId = req.params.event_id;
	let response;
	let breakPoint = [4, 12, 20, 28, 36];
	for (let i in breakPoint){
		response = await weather.weatherForcastbyLocation(location);
		if (moment(response.dt_txt[i]).format("l") === moment(event.getDate(eventId)).format("l")) {
			var temp = Math.round(response.list[i].main.temp - 273.15 ) + " " + String.fromCharCode(176) + "C";
			var humidity = response.list[i].main.humidity + "%";
			var icon = response.list[i].weather[0].icon; 
			let results =[temp, humidity, icon];
			res.json(results);
		}
		else {
			console.log("The date you choose is not qualified for weather forcast!");
		}
	}
});


module.exports = apiRoutes;