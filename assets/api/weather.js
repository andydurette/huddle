const apiKey = process.env.REACT_APP_API_KEY_Weather;
const axios = require("axios");


class weather {
	constructor(){
	}

	async weatherForcastbyLocation(city){
		let res = await axios.get(`api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`); 
		return res; 
	} 
}

module.exports =  weather;