const express = require('express');
const router = express.Router();
const { getUsers, createUsers, getUser, updateUser, deletetUser, loginUsers } = require('../controllers/userController');

router.route('/').get(getUsers);

router.route('/').post(createUsers);

router.route('/login').post(loginUsers);

router.route('/:id').get(getUser);

router.route('/:id').put(updateUser);

router.route('/:id').delete(deletetUser);

module.exports = router;