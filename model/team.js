const pool = require('../config/connection');

class Team {
    constructor(){
        this.pool = pool;
    }

    async createNew(){
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