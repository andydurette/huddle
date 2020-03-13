const express = require("express");
//const bcrypt = require("bcryptjs");
const isAuthenticated = require("./isAuthenticated");
//const User = require("../model/classes/user");
const passport = require("../config/authConfigLocal");
//const saltRounds = 10;
//let user = new User();

var apiRoutes = express.Router();

apiRoutes.post("/api/login", passport.authenticate("local", {failureMessage: "Incorrect user name or password"}), function(req, res){
	res.send("Success");
});

apiRoutes.get("/api/test", isAuthenticated, function(req, res){
	res.send("The user is authenticated");
});

apiRoutes.get("/api/logout", function(req, res){
	req.logout();
	res.send("redirect successful");
});

module.exports = apiRoutes;