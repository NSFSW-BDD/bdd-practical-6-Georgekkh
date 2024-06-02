const userModel = require("../models/userModel");
// const bcrypt = require('bcrypt');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware'); // Import bcrypt middleware

const userController = {
    getAllUsers: (req, res, next) => {
        userModel.getAllUsers((error, results, fields) => {
            if (error) {
                console.error("Error readAllUsers:", error);
                return res.status(500).json(error);
            }
            res.status(200).json({ results, fields });
        });
    },

    getUserById: (req, res, next) => {
        const data = { userid: req.params.userid };
        userModel.getUserById(data, (error, results, fields) => {
            if (error) {
                console.error("Error readUserById:", error);
                return res.status(500).json(error);
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(results[0]);
        });
    },

    createNewUser: (req, res, next) => {
        const data = {
            username: req.body.username,
            role: req.body.role,
            email: req.body.email,
            password: req.body.password
        };
        userModel.createNewUser(data, (error, results, fields) => {
            if (error) {
                console.error("Error createNewUser:", error);
                return res.status(500).json(error);
            }
            res.status(201).json({ message: "User created successfully", userid: results.insertId });
        });
    },

    updateUserById: (req, res, next) => {
        const data = {
            userid: req.params.userid,
            username: req.body.username,
            email: req.body.email,
            // password: req.body.password
        };
        userModel.updateUserById(data, (error, results, fields) => {
            if (error) {
                console.error("Error updateUserById:", error);
                return res.status(500).json(error);
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User updated successfully" });
        });
    },

    deleteUserById: (req, res, next) => {
        const data = { userid: req.params.userid };
        userModel.deleteUserById(data, (error, results, fields) => {
            if (error) {
                console.error("Error deleteUserById:", error);
                return res.status(500).json(error);
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        });
    },

    loginUser: (req, res, next) => {
        const data = {
            email: req.body.email,
        };

        userModel.getUserByEmail(data, (error, results, fields) => {
            if (error) {
                console.error("Error Login:", error);
                return res.status(500).json(error);
            }
            if (results.length === 0) { // No match
                return res.status(404).json({
                    message: "Email/password wrong",
                });
            } else { // Match email
                res.locals.hash = results[0].password; // Store hashed password in res.locals
                res.locals.userid = results[0].userid; // Save userid from database
                res.locals.role = results[0].role; // Save role from database
                res.locals.message = "Login successful"; // Set a success message
                next(); // Call next middleware to compare password
            }
        });
    },
    
    // Use bcryptMiddleware to compare passwords
    comparePassword: (req, res, next) => {
        const callback = (err, isMatch) => {
            if (err) {
                console.error("Error bcrypt:", err);
                res.status(500).json(err);
            } else {
                if (isMatch) {
                    res.locals.message = "Login successful"; // Set a success message
                    next(); // Passwords match, proceed to the next middleware
                } else {
                    res.status(401).json({
                        message: "Wrong password",
                    });
                }
            }
        };
        bcrypt.compare(req.body.password, res.locals.hash, callback);
    }
};

module.exports = userController;