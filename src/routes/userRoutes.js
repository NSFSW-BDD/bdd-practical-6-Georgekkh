const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const sendToken = require('../middlewares/sendToken'); // Ensure this path is correct

router.get('/', jwtMiddleware.verifyToken, userController.getAllUsers); // Protected route
router.post('/', bcryptMiddleware.hashPassword, userController.createNewUser);
router.get('/:userid', userController.getUserById);
router.put('/:userid', userController.updateUserById);
router.delete('/:userid', userController.deleteUserById);
router.post('/login', 
    userController.loginUser, 
    bcryptMiddleware.comparePassword, 
    jwtMiddleware.generateToken, 
    sendToken.sendToken // Use the sendToken middleware here
);

module.exports = router;
