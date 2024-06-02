const pool = require('../services/db');

var furnitureModel = {
    selectAllFurniture: (callback) => {
        const SQLSTATEMENT = 'SELECT * FROM furniture';

        pool.query(SQLSTATEMENT, (err, result) => {
            if(err) throw err;
            callback(null, result);
        });
    },

    selectFurnitureById: (data, callback) => {
        const SQLSTATEMENT = 'SELECT * FROM furniture WHERE fid = ?';

        pool.query(SQLSTATEMENT, [data.fid], (err, result) => {
            if(err) throw err;
            callback(null, result);
        });
    },

    createNewFurniture: (data, callback) => {
        const SQLSTATEMENT = 'INSERT INTO furniture (name, description, price, quantity, catid) VALUES (?, ?, ?, ?, ?)';

        const VALUES = [data.name, data.description, data.price, data.quantity, data.catid];

        pool.query(SQLSTATEMENT, VALUES, (err, result) => {
            if(err) throw err;
            callback(null, result);
        });
    },

    updateFurnitureById : (data, callback) => {
        const SQLSTATEMENT = 'UPDATE furniture SET name = ?, description = ?, price = ?, quantity = ?, catid = ? WHERE fid = ?';

        const VALUES  = [data.name, data.description, data.price, data.quantity, data.catid, data.fid];

        pool.query(SQLSTATEMENT, VALUES, (err, result) => {
            if(err) throw err;
            callback(null, result);
        });
    },

    deleteFurnitureById : (data, callback) => {
        const SQLSTATEMENT = 'DELETE FROM furniture WHERE fid = ?';

        const VALUES = [data.fid];

        pool.query(SQLSTATEMENT, VALUES, (err, result) => {
            if(err) throw err;
            callback(null, result);
        });
    }
}

module.exports = furnitureModel;