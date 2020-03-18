const pool = require("../config/connection");

class User {
	constructor(){
		this.pool = pool;
	}

	async getType(userId, teamId){
		let query = `select tu.user_type_id
                    from team_user tu 
                    where tu.user_id = ${userId} and tu.team_id = ${teamId};`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
	}

	async getInfoByEmail(email){
		let query = `select id, first_name, last_name, email, password
                    from user
                    where email = '${email}';`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
	}

	async getInfoById(id){
		let query = `select first_name, last_name, email
                    from user
                    where id = ${id};`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
	}

	async getAllWithoutTeam() {
		let query = `        
		select * from user u
		left outer join team_user tu on tu.user_id = u.id
        left outer join team_member tm on tm.user_id = u.id
		where tu.team_id is null and tm.team_id is null;`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		} 
	}

	async createNew(firstName, email){
		let query = `insert into user(first_name, email) values ('${firstName}','${email}');`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		} 
	}

	async createNewEmail(email){
		let query = `insert into user (email) values ('${email}');`;
		try {
			let result = await this.pool.query(query);
			return result;
		}
		catch(error){
			return error;
		}
        
	}

	async exists(email){
		let query = `select *
                    from user
                    where email = '${email}';`;
		try {
			let result = await this.pool.query(query);
			if (result.length > 0) {
				return true;
			} else {
				return false;
			}  
		}
		catch(error){
			return error;
		}
	}

	async updatePassword(id, password){
		let query = `update user
                    set password = '${password}'
                    where id = ${id}; `;
		try {
			await this.pool.query(query);
			return 1;
		}
		catch(error){
			return error;
		}
	}

}

module.exports = User;