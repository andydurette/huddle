const pool = require("../config/connection");

class Event {
	constructor(){
		this.pool = pool;
    }
    
    async createNew(teamId, eventTypeId, eventDate, venueId, eventName, competitorId, competitorName){
        let query = `insert into event(team_id, event_type_id, event_date, venue_id, event_name, competitor_id, competitior_name)
        values (${teamId}, ${eventTypeId}, '${eventDate}', ${venueId}, '${eventName}', ${competitorId}, '${competitorName}');`;
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error) {
			return error;
		}
    }

    async delete(eventId){
        let query = `delete from event where event_id = ${eventId}`;
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error) {
			return error;
		}
    }

    async createAttendanceRecord(eventId, userId){
        let query = `insert into event_user values ( ${eventId}, ${userId}, 4, null);`;
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error) {
			return error;
		}
	}

	async getAnswerTypes(){
		let query = `select name from confirmation_status;`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error) {
			return error;
		}	
	}

	async updateAttendance(eventId, userId, confirmationStatusId, comment){
		let query = `update event_user set confirmation_status_id = ${confirmationStatusId}, comment = '${comment}
					where event_id = ${eventId} and user_id = ${userId};`;
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

module.exports = Event;