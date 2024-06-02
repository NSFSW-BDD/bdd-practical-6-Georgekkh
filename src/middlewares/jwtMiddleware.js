require("dotenv").config();

const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;
const tokenAlgorithm = process.env.JWT_ALGORITHM;

//     //////////////////////////////////////////////////////
//     // MIDDLEWARE FUNCTION FOR GENERATING JWT TOKEN
//     //////////////////////////////////////////////////////

const jwtMiddleware = {
    generateToken: (req, res, next) => {
        const payload = {
            userid: res.locals.userid,
            role: res.locals.role,
            timestamp: new Date()
        };
        const options = {
            algorithm: tokenAlgorithm,
            expiresIn: tokenDuration,
        };
        jwt.sign(payload, secretKey, options, (err, token) => {
            if (err) {
                console.error("Error jwt:", err);
                return res.status(500).json(err);
            } else {
                res.locals.token = token;
                next();
            }
        });
    },
    
    sendToken: (req, res) => {
        res.status(200).json({
            message: "Login successful",
            token: res.locals.token,
        });
    },
    
    verifyToken: (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const token = authHeader.substring(7);
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Invalid token" });
            }
            res.locals.userid = decoded.userid;
            res.locals.role = decoded.role;
            res.locals.tokenTimestamp = decoded.timestamp;
            next();
        });
    }
};

module.exports = jwtMiddleware;