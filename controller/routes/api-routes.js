const express = require("express");
const isAuthenticated = require("../isAuthenticated");
const User = require("../../model/user"); 
const passport = require("../../config/authConfigLocal");
const Team = require("../../model/team");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

let user = new User();
let team = new Team();

let apiRoutes = express.Router();

let hash = async function(password) {
	let hash = await bcrypt.hash(password, saltRounds);
	return hash;
};

apiRoutes.post("/login", passport.authenticate("local", {failureMessage: "Incorrect user name or password"}), function(req, res){
	res.send("Success");
});


//user routes
apiRoutes.get("/user/team/:userid/:teamid", isAuthenticated, async (req, res) => {
	let userId = req.params.userid;
	let teamId = req.params.teamid;
	let data = await user.getType(userId, teamId);
	res.json(data);
});

apiRoutes.get("/user/email/:email", isAuthenticated, async (req, res) => {
	let email = req.params.email;
	let data = await user.getInfoByEmail(email);
	res.json(data);
});

apiRoutes.get("/user/info/:id", isAuthenticated,  async (req, res) => {
	let id = req.params.id;
	let data = await user.getInfoById(id);
	console.log(data);
	res.json(data);
});

apiRoutes.post("/user/signup/", isAuthenticated, async (req, res) => {
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;
	let email = req.body.email;
	let password = hash(req.body.password);
	let data = await user.createNew(firstName, lastName, email, password);
	res.json(data);
});


//team routes
apiRoutes.post("/team/new/", isAuthenticated, async (req, res) => {
	let name = req.body.name;
	let description = req.body.description;
	let sport = req.body.sport;
	let data = await team.createNew(name, description, sport);
	res.json(data);
});

apiRoutes.post("/team/newmember/", isAuthenticated, async (req, res) => {
	let teamId = req.body.team;
	let userId = req.body.user;
	let positionId = req.body.position;
	let data = await team.addMember(teamId, userId, positionId);
	res.json(data);
});
//*
apiRoutes.put("/team/playerposition/:userId/:positionId", isAuthenticated, async (req, res) => {
	let userId = req.params.userId;
	let positionId = req.params.positionId;
	let data = await team.updatePlayerPosition(userId, positionId);
	res.json(data);
});

apiRoutes.delete("/team/deletemember/:teamId/:userId", isAuthenticated, async (req, res) => {
	let teamId = req.params.teamid;
	let userId = req.params.userid;
	let data = await team.removeMember(teamId, userId);
	res.json(data);
});
//*
apiRoutes.delete("/team/delete/:teamId", isAuthenticated, async (req, res) => {
	let teamId = req.params.teamid;
	let data = await team.deleteTeam(teamId);
	res.json(data);
});




module.exports = apiRoutes;