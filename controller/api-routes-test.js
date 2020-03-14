const express = require("express");
//const bcrypt = require("bcryptjs");
const checkJwt = require("./checkJwt");
//const User = require("../model/classes/user");
//const saltRounds = 10;
//let user = new User();
var apiRoutes = express.Router();
// apiRoutes.post("/api/login", passport.authenticate("local", {failureMessage: "Incorrect user name or password"}), function(req, res){
//  res.send("Success");
// });
apiRoutes.get("/api/external", checkJwt, (req, res) => {
	console.log("checking the route...");
	res.send({
		msg: "Your Access Token was successfully validated!"
	});
});
apiRoutes.get("/api/test", checkJwt, function(req, res){
	res.json({"response": "The user is authenticated"});
});
apiRoutes.get("/api/logout", function(req, res){
	req.logout();
	res.send("redirect successful");
});
module.exports = apiRoutes;