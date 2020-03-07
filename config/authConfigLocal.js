const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user"); 
const bcrypt = require("bcryptjs");

let user = new User();
//var db = require("../models"); TBD

passport.use(new LocalStrategy( 
	function(username, password, done) {
		console.log("request received, user: ", username);
		user.getInfoByEmail(username)
			.then(async function(userInfo){
				let result;
				if (userInfo.length < 1) {
					result = false;
				} else {
					//console.log(userInfo);
					// console.log('pwd: ', userInfo[0][0].password);
					// let hash = async function(password) {
					// 	let hash = await bcrypt.hash(password, 10);
					// 	return hash;
					// }
					// let hashed = await hash(userInfo[0][0].password)
					// console.log('hashed: ', hashed)
					result = await bcrypt.compare(password, userInfo[0][0].password);
					//console.log(result);
				}
				if (!result) {
					//console.log('got into !result');
					done(null, false, {message: "Incorrect email or password"});
				} else {
					//console.log('userInfo[0] passed to done: ', userInfo[0]);
					done(null, userInfo[0][0]);
				} 
			})
			.catch(function(err){
				throw err;
			});
	})); 



passport.serializeUser(function(user, done) {
	//console.log('user.id in serialize: ', user.id)
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	//console.log('id in deserialize: ', id);
	user.getInfoById(id)
		.then(function(result){
			let userObj = result[0][0];
			//console.log('ready to send userObj: ', userObj)
			done(null, userObj);
		})
		.catch();
});

// Exporting our configured passport
module.exports = passport;