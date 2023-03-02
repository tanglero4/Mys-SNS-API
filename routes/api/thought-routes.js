const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getSingleThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(createThought);

router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

  // /api/students/:studentId/assignments
router.route('/:thoughtId/reaction').post(addReaction);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);

module.exports = router;