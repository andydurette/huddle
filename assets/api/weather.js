var apiKey = "3a4dd83a114abb86edd8a975843229f2";
var currentDate = moment().format("MMMM Do YYYY");
var currentDay = moment().format("dddd");

class weather {
    constructor(){
    }

    async weatherForcastbyLocation(city){
        let res = await axios.get(`api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`); 
        return res; 
    } 

}