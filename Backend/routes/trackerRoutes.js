const express = require('express');
const router = express.Router();
const { getTrackers, createTracker, updateTracker, deleteTracker } = require('../controllers/trackerController');
const validateUser = require('../middlewares/userValidator');

router.route('/').get(validateUser, getTrackers);
router.route('/').post(validateUser, createTracker);
router.route('/:id').put(validateUser, updateTracker);
router.route('/:id').delete(validateUser, deleteTracker);

module.exports = router;