const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const authConfig = {
	domain: "dev-0ec6it0o.auth0.com",
	audience: "https://dev-0ec6it0o.auth0.com/api/v2/"
};

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
	}),
	audience: authConfig.audience,
	issuer: `https://${authConfig.domain}/`,
	algorithm: ["RS256"]
});

module.exports = checkJwt;