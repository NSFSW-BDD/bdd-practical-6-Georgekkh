const pool = require('../services/db');

const categoryModel = {
    selectAllCategory: (callback) => {
        const SQLSTATEMENT = 'SELECT * FROM category';
        pool.query(SQLSTATEMENT, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    selectCategoryById: (data, callback) => {
        const SQLSTATEMENT = 'SELECT * FROM category WHERE catid = ?';
        pool.query(SQLSTATEMENT, [data.catid], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    createNewCategory: (data, callback) => {
        const SQLSTATEMENT = 'INSERT INTO category (name, description) VALUES (?, ?)';
        pool.query(SQLSTATEMENT, [data.name, data.description], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    updateCategoryById: (data, callback) => {
        const SQLSTATEMENT = 'UPDATE category SET name = ?, description = ? WHERE catid = ?';
        pool.query(SQLSTATEMENT, [data.name, data.description, data.catid], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    deleteCategoryById: (data, callback) => {
        const SQLSTATEMENT = 'DELETE FROM category WHERE catid = ?';
        pool.query(SQLSTATEMENT, [data.catid], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

module.exports = categoryModel;