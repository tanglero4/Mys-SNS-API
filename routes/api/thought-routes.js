const router = require('express').Router();
const {
    getThoughts,
    createThought
} = require('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(createThought);

module.exports = router;