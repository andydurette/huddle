const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

// Define API routes here

// Grab Login Data for Login
app.post("/api/login", async (req, res) => {
	let loginData = req.body;
	console.log(loginData);
	res.sendStatus(200);
});

// Grab Login Data for Login
app.post("/api/signup", async (req, res) => {
	let signUpData = req.body;
	console.log(signUpData);
	res.sendStatus(200);
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
	console.log(`🌎 ==> API server now on port ${PORT}!`);
});
