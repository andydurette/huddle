const pool = require("../config/connection");

class Venue {
	constructor(){
		this.pool = pool;
    }

    async addVenue(apiId, name, lat, lon, address, phone){
        let query = `insert into venue(api_id, name, lat, lon, address, phone) values 
        ('${apiId}', '${name}', ${lat}, ${lon}, '${address}', '${phone}');`;
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error) {
			return error;
		}
    }

    async updateEvent(){
        let query = ``;
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error) {
			return error;
		}
    }

    async updateEvent(){
        let query = ``;
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error) {
			return error;
		}
    }
}