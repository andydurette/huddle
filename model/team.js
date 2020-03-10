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

	async getSports(){
        let query = `select name from sport;`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error) {
			return error;
		}
	}

	async getPlayerPositions(sportId){
        let query = `select player_pos_name from player_position where sports_id = ${sportId};`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error) {
			return error;
		}
	}	
	
	async getTeam(teamId){
		let query = `select t.name, t.description, s.name, 
		concat(u.first_name, ' ', u.last_name) as 'member', pp.player_pos_name
		from team t
		join team_member tm on tm.team_id = t.id
		join user u on tm.user_id = u.id
		join player_position pp on tm.player_pos_id = pp.player_pos_id
		join sport s on t.sports_id = s.id
		where t.id = ${teamId};`;
		try {
			let result = await this.pool.query(query);
			return result;
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

	async updatePlayerPosition(teamId, userId, positionId){
		let query = `update team_member set player_pos_id = ${positionId} 
		where team_id = ${teamId} and user_id = ${userId};`;
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

	async delete(teamId){
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