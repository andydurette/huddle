const pool = require("../config/connection");

class Event {
	constructor(){
		this.pool = pool;
	}
	
	async getDate(eventId){
		let query = `select event_date from event where event_id = ${eventId}`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error) {
			return error;
		}
	}
	
	async getDetails(eventId){
		let query = `
		select e.event_id, et.name, v.*, u.id, concat(u.first_name, ' ', u.last_name) as 'member', 
		cs.name, eu.comment
		from event e
		join venue v on v.id = e.venue_id
		join event_types et on et.id = e.event_type_id
		join event_user eu on eu.event_id = e.event_id 
		join confirmation_status cs on cs.id = eu.confirmation_status_id
		join user u on u.id = eu.user_id
		where e.event_id = ${eventId};
		`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error) {
			return error;
		}
	}

	async getAllFuture(teamId){
		let query = `
		select e.*, v.api_id, v.name as "vanue_name", v.lat, v.lon, v.address, v.phone,
		et.name as "event_name"
		from event e
		join venue v on v.id = e.venue_id
		join event_types et on et.id = e.event_type_id
		where e.event_date > NOW() and e.team_id = ${teamId};`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error) {
			return error;
		}
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
		let query = "select name from confirmation_status;";
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

	async updateEvent(eventId, teamId, eventTypeId, eventDate, venueId, eventName, competitorId, competitorName, scoreOur, scoreTheir){
		let query = `
		update event set team_id = ${teamId}, event_type_id = ${eventTypeId}, event_date = ${eventDate}, venue_id = ${venueId}, 
		event_name = ${eventName}, competitor_id = ${competitorId}, competitior_name = ${competitorName}, 
		score_our = ${scoreOur}, score_their = ${scoreTheir}
		where event_id = ${eventId};
		`;
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