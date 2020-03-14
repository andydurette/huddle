const express = require("express");
// Start of Added Auth0 JWT authentication libraries
const cors = require("cors");
// End of Added Auth0 JWT authentication libraries
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require("./controller/routes/api-routes");
const isAuthenticated = require("./controller/isAuthenticated");
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}
// Start of Auth0 Setup data
// Accept cross-origin requests from the frontend app
let origin;

if (process.env.NODE_ENV === "production") {
	origin = "https://lets-huddle.herokuapp.com/";
} else{
	origin = "http://localhost:3000";
}

app.use(cors({ origin: origin }));
// Set up Auth0 configuration
// Define an endpoint that must be called with an access token
// End of Auth0 Setup data
// Accept cross-origin requests from the frontend app
// Send every other request to the React app
// Define any API routes before this runs
app.use("/api", apiRoutes);
app.get("*", isAuthenticated, (req, res) => {
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.listen(PORT, () => {
	console.log(`🌎 ==> API server now on port ${PORT}!`);
});