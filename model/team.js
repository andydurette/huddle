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
		let query = "select id, name from sport;";
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error) {
			return error;
		}
	}

	async getPlayerPositions(sportId){
		let query = `select player_pos_id, player_pos_name from player_position where sports_id = ${sportId};`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error) {
			return error;
		}
	}	

	async getTeamByDetails(name, sportId){
		let query = `select t.id, t.team_name, t.team_description, s.id as 'sport_id', s.name
		from team t
		left outer join sport s on t.sports_id = s.id
		where t.team_name = '${name}' and sports_id = ${sportId};`;
		try {
			let result = await this.pool.query(query);
			//console.log('query result: ', result);
			return result;
		}
		catch(error) {
			return error;
		}
	}
	
	async getTeam(teamId){
		let query = `select t.id, t.name, t.description, s.name, 
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

	async addTeamUser(teamId, userId, userTypeId){
		let query = `insert into team_user (team_id, user_id, user_type_id) values
		(${teamId}, ${userId}, ${userTypeId});`;
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error) {
			return error;
		}
	}	

	async getTeamUser(userId){
		let query = `select tu.*, ut.type_name from team_user tu 
		join user_type ut on ut.id = tu.user_type_id
		where user_id = ${userId};`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error) {
			return error;
		}
	}

	async getTeamAdmin(userId){
		let query = `
        select tu.*, t.team_name, t.team_description, t.sports_id, s.name, ut.type_name 
		from team_user tu
		join team t on tu.team_id = t.id 
		join user_type ut on ut.id = tu.user_type_id
        join sport s on s.id = t.sports_id
		where tu.user_id = ${userId} and tu.user_type_id = 1;`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error) {
			return error;
		}
	}

	async delete(teamId){
		let query = `delete from team where id = ${teamId}`;
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