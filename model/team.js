const pool = require("../config/connection");

class Team {
	constructor(){
		this.pool = pool;
	}

	async createNew(name, description, sportId){
		let query = `insert into team (team_name, team_description, sports_id) values 
		('${name}', '${description}', ${sportId});`;
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error) {
			return error;
		}
	}

	async addMember(teamId, userId, positionId){
		let position;
		(positionId === "") ? position = "null" : position = positionId; // will be null if the value is empty
		let query = `insert into team_member (team_id, user_id, player_pos_id) values
		(${teamId}, ${userId}, ${position});`;
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error) {
			return error;
		}
	}

	async updatePlayerPosition(){
		let query = "";
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error) {
			return error;
		}
	}
	
	async removeMember(teamId, userId){
		let query = `delete from team_member where team_id = ${teamId} and user_id = ${userId};`;
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error) {
			return error;
		}
	}


	async deleteTeam(){
		let query = "";
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error) {
			return error;
		}
	}
}

module.exports = Team;