const pool = require('../services/db');
// const bcrypt = require('bcrypt');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware'); // Import bcrypt middleware

const userModel = {
    getAllUsers: (callback) => {
        const SQLSTATEMENT = 'SELECT * FROM user';
        pool.query(SQLSTATEMENT, (err, results, fields) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getUserById: (data, callback) => {
        const SQLSTATEMENT = 'SELECT * FROM user WHERE userid = ?';
        pool.query(SQLSTATEMENT, [data.userid], (err, results, fields) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    createNewUser: (data, callback) => {
        const SQLSTATEMENT = 'INSERT INTO user (username, email, role, password) VALUES (?, ?, ?, ?)';
        pool.query(SQLSTATEMENT, [data.username, data.email, data.role, data.password], (err, results, fields) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    updateUserById: (data, callback) => {
        const SQLSTATEMENT = 'UPDATE user SET email = ? WHERE userid = ?';
        pool.query(SQLSTATEMENT, [data.email, data.userid], (err, results, fields) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    deleteUserById: (data, callback) => {
        const SQLSTATEMENT = 'DELETE FROM user WHERE userid = ?';
        pool.query(SQLSTATEMENT, [data.userid], (err, results, fields) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getUserByEmail: (data, callback) => {
        const SQLSTATEMENT = 'SELECT * FROM user WHERE email = ?';
        pool.query(SQLSTATEMENT, [data.email], (err, results, fields) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = userModel;


// const userModel = {
//     getAllUsers: (callback) => {
//         const SQLSTATEMENT = 'SELECT * FROM user';
//         pool.query(SQLSTATEMENT, (err, results, fields) => {
//             if (err) return callback(err);
//             callback(null, results);
//         });
//     },

//     getUserById: (data, callback) => {
//         const SQLSTATEMENT = 'SELECT * FROM user WHERE userid = ?';
//         pool.query(SQLSTATEMENT, [data.userid], (err, results, fields) => {
//             if (err) return callback(err);
//             callback(null, results);
//         });
//     },

//     createNewUser: (data, callback) => {
//         bcrypt.hash(data.password, 10, (err, hashedPassword) => {
//             if (err) return callback(err);
//             const SQLSTATEMENT = 'INSERT INTO user (username, email, role, password) VALUES (?, ?, ?, ?)';
//             pool.query(SQLSTATEMENT, [data.username, data.email, data.role, hashedPassword], (err, results, fields) => {
//                 if (err) return callback(err);
//                 callback(null, results);
//             });
//         });
//     },

//     updateUserById: (data, callback) => {
//         const SQLSTATEMENT = 'UPDATE user SET email = ? WHERE userid = ?';
//         pool.query(SQLSTATEMENT, [data.email, data.userid], (err, results, fields) => {
//             if (err) return callback(err);
//             callback(null, results);
//         });
//     },

//     deleteUserById: (data, callback) => {
//         const SQLSTATEMENT = 'DELETE FROM user WHERE userid = ?';
//         pool.query(SQLSTATEMENT, [data.userid], (err, results, fields) => {
//             if (err) return callback(err);
//             callback(null, results);
//         });
//     },

//     loginUser: (data, callback) => {
//         const SQLSTATEMENT = 'SELECT * FROM user WHERE email = ?';
//         pool.query(SQLSTATEMENT, [data.email], (err, results, fields) => {
//             if (err) return callback(err);
//             if (results.length === 0) {
//                 return callback(null, { success: false, message: 'Invalid email or password' });
//             }
//             const user = results[0];
//             bcrypt.compare(data.password, user.password, (err, isMatch) => {
//                 if (err) return callback(err);
//                 if (!isMatch) {
//                     return callback(null, { success: false, message: 'Invalid email or password' });
//                 }
//                 callback(null, { success: true, user });
//             });
//         });
//     },
// };

