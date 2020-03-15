const express = require("express");
const checkJwt = require("../checkJwt");
const passport = require("../../config/authConfigLocal");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const User = require("../../model/user");
const Team = require("../../model/team");
const Event = require("../../model/event");

let user = new User();
let team = new Team();
let event = new Event();

let apiRoutes = express.Router();

let hash = async function(password) {
	let hash = await bcrypt.hash(password, saltRounds);
	return hash;
};

apiRoutes.post("/login", passport.authenticate("local", {failureMessage: "Incorrect user name or password"}), function(req, res){
	res.send("Success");
});

apiRoutes.get("/test", checkJwt, function(req, res){
	res.json({"response": "The user is authenticated"});
});

apiRoutes.get("/external", checkJwt, (req, res) => {
	console.log("checking the route...");
	res.send({
		msg: "Your Access Token was successfully validated!"
	});
});

// apiRoutes.get("/api/user/email/:email", checkJwt, function(req, res){
// 	res.json({"response": "The user is authenticated"});
// });

//user routes
apiRoutes.get("/user/team/:userid/:teamid", checkJwt, async (req, res) => {
	let userId = req.params.userid;
	let teamId = req.params.teamid;
	let data = await user.getType(userId, teamId);
	res.json(data);
});

//API - USER AUTH
//Check - if email does not exist it creates it and send back the id of the new user
//      else if the email exists, it sends back the user ID
apiRoutes.post("/user/email", checkJwt, async (req, res) => {
	let email = req.body.userEmail;
	let name = req.body.userName;
	let data = await user.getInfoByEmail(email);
	if (data[0].length < 1){
		let newData = await user.createNew(name, email);
		console.log("New user created - ID: ",newData[0].insertId);
		console.log("newData: ", newData[0].insertId);
		res.json(newData[0].insertId);
	}else{
		console.log("The user ID: ",data[0][0].id);
		res.json(data[0][0].id);
	}
});

apiRoutes.post("/user/info", checkJwt,  async (req, res) => {
	let id = req.body.id;
	console.log(id);
	let data = await user.getInfoById(id);
	//console.log(data);
	res.json(data);
});

apiRoutes.post("/user/signup", checkJwt, async (req, res) => {
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;
	let email = req.body.email;
	let password = hash(req.body.password);
	let data = await user.createNew(firstName, lastName, email, password);
	res.json(data);
});


//team routes
apiRoutes.post("/team/new", checkJwt, async (req, res) => {
	let name = req.body.name;
	let description = req.body.description;
	let sport = req.body.sport;
	let userId = req.body.userId;
	let data = await team.createNew(name, description, sport);
	if (data === 1) {
		//console.log("name: ", name);
		//console.log("sport: ", sport);
		let teamResult = await team.getTeamByDetails(name, sport);
		//console.log('returned from the DB: ', teamResult);
		let teamId = teamResult[0][0].id;
		console.log("team ID: ", teamId);
		console.log("user ID: ", userId);
		let insertResult = await team.addTeamUser(teamId, userId, 1);
		if (insertResult === 1) {
			let adminTeamsResult = await team.getTeamAdmin(userId);
			res.json(adminTeamsResult[0]);
		} else {
			res.status(500).send("Uh-oh");
		}
	} else {
		res.status(500).send("Uh-oh");
	}
	
});

apiRoutes.post("/teamCheck", checkJwt, async (req, res) => {
	let userId = req.body.userId;
	let data = await team.getTeamByUser(userId);
	console.log("has teams: ", data[0]);
	if (data[0]) {
		if (data[0].length > 0) {
			res.json({"hasTeams": true});
		} else {
			res.send({"hasTeams": false});
		}
	} else {
		res.send({"hasTeams": false});
	}
});

apiRoutes.post("/team/newmember", checkJwt, async (req, res) => {
	let teamId = req.body.team;
	let userId = req.body.user;
	let positionId = req.body.position;
	let data = await team.addMember(teamId, userId, positionId);
	res.json(data);
});
//*
apiRoutes.put("/team/playerposition/:userId/:positionId", checkJwt, async (req, res) => {
	let userId = req.params.userId;
	let positionId = req.params.positionId;
	let data = await team.updatePlayerPosition(userId, positionId);
	res.json(data);
});

apiRoutes.delete("/team/deletemember/:teamId/:userId", checkJwt, async (req, res) => {
	let teamId = req.params.teamid;
	let userId = req.params.userid;
	let data = await team.removeMember(teamId, userId);
	res.json(data);
});
//*
apiRoutes.delete("/team/delete/:teamId", checkJwt, async (req, res) => {
	let teamId = req.params.teamid;
	let data = await team.deleteTeam(teamId);
	res.json(data);
});


//event routes
apiRoutes.get("/event/date/:id", checkJwt, async (req, res) => {
	let eventId = req.params.id;
	let data = await event.getDate(eventId);
	res.json(data);
});

apiRoutes.get("/event/detail/:id", checkJwt, async (req, res) => {
	let eventId = req.params.id;
	let data = await event.getDetails(eventId);
	res.json(data);
});

apiRoutes.post("/event/new/:id", checkJwt, async (req, res) => {
	let teamId = req.params.id;
	let eventType = req.body.eventType;
	let eventDate = req.body.eventDate;
	let venue = req.body.venue;
	let eventName = req.body.eventName;
	let competitorId = req.body.competitorId;
	let competitorName = req.body.competitorName;
	let data = await event.createNew(teamId, eventType, eventDate, venue, eventName, competitorId, competitorName);
	res.json(data);
});

apiRoutes.delete("/event/delete/:id", checkJwt, async (req, res) => {
	let eventId = req.params.id;
	let data = await event.delete(eventId);
	res.json(data);
});

apiRoutes.post("/event/newattend/:id", checkJwt, async (req, res) => {
	let eventId = req.params.id;
	let userId = req.body.userId;
	let data = await event.createAttendanceRecord(eventId, userId);
	res.json(data);
});

apiRoutes.put("/event/updateattend/:id", checkJwt, async (req, res) => {
	let eventId = req.params.id;
	let userId = req.body.userId;
	let confirmationStatusId = req.body.confirmationStatusId;
	let comment = comment.req.body;
	let data = await event.createAttendanceRecord(eventId, userId, confirmationStatusId, comment);
	res.json(data);
});

//getAnswerTypes, updateEvent



module.exports = apiRoutes;