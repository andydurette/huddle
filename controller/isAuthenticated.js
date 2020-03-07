module.exports = function(req, res, next) {
	// If the user is logged in, continue with the request to the restricted route
	if (req.user) {
		console.log('req.user: ', req.user);
		next();
	} else {
		// If the user isn't logged in, redirect them to the login page
		return res.send("Go elsewhere!!!");
	}
};
  