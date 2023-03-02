const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getSingleThought,
    deleteThought
} = require('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(createThought);

router
  .route('/:thoughtId')
  .get(getSingleThought)
//   .put(updateCourse)
  .delete(deleteThought);

module.exports = router;