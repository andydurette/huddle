const key = process.env.REACT_APP_API_KEY_YELP;
const axios = require("axios");


const config = { headers: {"Authorization": `Bearer ${key}`} }; 


class Yelp {
	constructor(){
	}

	async searchVenueByLocation(location) {
		let res = await axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}`, config); 
		return res; 
	}

	async searchVenueByCoord(lat, lon, radius) {
		let res = await axios.get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&radius=${radius}`, config); 
		return res; 
	}

	async searchVenueByCoordAndTerm(lat, lon, radius, term) {
		let res = await axios.get(`https://api.yelp.com/v3/businesses/search?term=${term}&latitude=${lat}&longitude=${lon}&radius=${radius}`, config); 
		return res; 
	}

	async getVenueDetail(businessId) {
		let res = await axios.get(`https://api.yelp.com/v3/businesses/${businessId}`, config); 
		return res; 
	}

	async searchVenueByLocationAndTerm(location, term) {
		let res = await axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`, config); 
		return res; 
	}



}    

module.exports =  Yelp;