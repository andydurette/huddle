const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const passport = require("passport");
const session = require("express-session");
const apiRoutes = require("./controller/api-routes-test");
const isAuthenticated = require("./controller/isAuthenticated");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}
app.use(session({ 
	secret: "something", 
	cookie: { 
		secure: false
	}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(apiRoutes);
// Define API routes here
const apiRoutes = require("./controller/routes/api-routes");
app.use('/api',apiRoutes);


// Grab Login Data for Login
// app.post("/api/login", async (req, res) => {
// 	let loginData = req.body;
// 	console.log(loginData);
// 	res.sendStatus(200);
// });

// Grab Login Data for Login
// app.post("/api/signup", async (req, res) => {
// 	let signUpData = req.body;
// 	console.log(signUpData);
// 	res.sendStatus(200);
// });

// app.get("/main", isAuthenticated, (req, res) => {
// 		res.redirect(200);
// 	});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", isAuthenticated, (req, res) => {
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
	console.log(`🌎 ==> API server now on port ${PORT}!`);
});
