require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const jwtMiddleware = {
    //////////////////////////////////////////////////////
    // MIDDLEWARE FUNCTION FOR VERIFYING JWT TOKEN
    //////////////////////////////////////////////////////
    verifyToken: (req, res, next) => {
        // Get the token from the request headers
        const authHeader = req.headers.authorization;

        // Check if the Authorization header exists
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Check if the token exists
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const callback = (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Invalid token" });
            }

            // Token is valid, store the decoded information for later use
            res.locals.userid = decoded.userid;
            res.locals.role = decoded.role;
            res.locals.tokenTimestamp = decoded.timestamp;

            // Move to the next middleware or route handler
            next();
        };

        // Verify the token
        jwt.verify(token, secretKey, callback);
    }
};

module.exports = jwtMiddleware;