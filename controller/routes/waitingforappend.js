const express = require("express");
const isAuthenticated = require("../isAuthenticated");
const passport = require("../../config/authConfigLocal");
const yelp = require("../../api/yelp");
const weather = require("../../api/weather");
const event = require("../model/classes/event");
const venue = require("../model/classes/venue");


let event = new event();
let venue = new venue();

let apiRoutes = express.Router();


const callApi = async () => {
    try {
      const token = await getTokenSilently();
      console.log('token: ', token);
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
  };

//search venue basing the type of sport and location  
apiRoutes.post("/api/venues/search", isAuthenticated, async function(req, res){
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

//get detail from select venue
apiRoutes.get("/api/venues/:businessId", isAuthenticated, async function(req, res){
	let businessId = req.params.id;
	let response = await yelp.getVenueDetail(businessId);
	res.json(response.data);
});


//add select venue to database
apiRoutes.post('/api/event/venue/add', isAuthenticated, async function(req, res){
	let businessId = req.params.id;
	response =  await yelp.getVenueDetail(businessId);
	let name = req.body.name.replace("'","''");
    let yelpId = req.body.id;
    let lon = req.body.coordinates.longitude;
    let lat = req.body.coordinates.latitude;
    let city = req.body.location.city;
    let address = JSON.stringify(req.body.location);
	let website = req.body.url;
	let phone = req.body.phone;
    let results = await venue.addNew(name, yelpId, lon, lat, city, address, website, phone);
	console.log('Adding a venue to the databse');
	res.json(results);
});



//update selected venue to event page
apiRoutes.post("/api/event/venue/add", isAuthenticated, async function(req, res){
	let businessId = req.params.id;
	response = await venue.getDetails(businessId);
	let eventId = req.params.event_id;
	let venueId = res.venue_id
	result = await event.updateEvent(eventId, venueId);
	res.json(result);
});


//delete venue from event and database
apiRoutes.delete("api/event/:venuesId", isAuthenticated, async (req, res) => {
	let eventId = req.params.event_id;
	let id = req.params.venue_id
	let venueId = null;
	response = await event.updateEvent(eventId, venueId);
	result = await venue.delete(id);
	res.json(result);
});

apiRoutes.get("/api/weather", isAuthenticated, async function(req, res){
	let location = req.body.location;
	let response;
	let breakPoint = [4, 12, 20, 28, 36];
	for (i in breakPoint){
	let response = await weather.weatherForcastbyLocation(location);
	if (moment(response.dt_txt[i]).format('l') === moment(event.getDate(eventId)).format('l')) {
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