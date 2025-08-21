const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Routes RESTful pour les utilisateurs
router.get('/getAllUsers', usersController.getAllUsers);
router.get('/getUserById:id', usersController.getUserById);
router.post('/createUser', usersController.createUser);
router.put('/updateUser:id', usersController.updateUser);
router.delete('/deleteUser:id', usersController.deleteUser);

module.exports = router;
