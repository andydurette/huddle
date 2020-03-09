const pool = require("../config/connection");

class Event {
	constructor(){
		this.pool = pool;
    }
    
    createNew(teamId, eventTypeId, eventDate, venueId, eventName, competitorId, competitorName){
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

    delete(eventId){
        let query = `delete from event where event_id = ${eventId}`;
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error) {
			return error;
		}
    }

    saveAttendanceStatus(eventId, userId, confirmationStatusId, comment){
        let query = ``;
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error) {
			return error;
		}
    }

    addComment(){
        let query = ``;
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error) {
			return error;
		}
    }

    updateEvent(){
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