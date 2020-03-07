const express = require("express");
const isAuthenticated = require("../isAuthenticated");
const User = require("../../model/user"); 
const passport = require("../../config/authConfigLocal");
const Team = require('../../model/team');
const bcrypt = require("bcryptjs");
const saltRounds = 10;

let user = new User();
let team = new Team()

let apiRoutes = express.Router();

let hash = async function(password) {
    let hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

apiRoutes.post("/login", passport.authenticate("local", {failureMessage: "Incorrect user name or password"}), function(req, res){
	res.send("Success");
});

apiRoutes.get('/user/team/:userid/:teamid', isAuthenticated, async (req, res) => {
    let userId = req.params.userid;
    let teamId = req.params.teamid;
    let data = await user.getType(userId, teamId)
    res.json(data);
});

apiRoutes.get('/user/email/:email', isAuthenticated, async (req, res) => {
    let email = req.params.email;
    let data = await user.getInfoByEmail(email)
    res.json(data);
})

apiRoutes.get('/user/info/:id', isAuthenticated,  async (req, res) => {
    let id = req.params.id;
    let data = await user.getInfoById(id)
    console.log(data);
    res.json(data);
});


apiRoutes.post('/user/signup/', isAuthenticated, async (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = hash(req.body.password);
    let data = await user.createNew(firstName, lastName, email, password);
    res.json(data);
})


module.exports = apiRoutes;