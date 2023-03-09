const router = require('express').Router();
// routes to controllers for users
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');

// adds both user routes after the '/' in the api url
router.route('/').get(getUsers).post(createUser);

// Adds controller routes to end of API url
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

module.exports = router;