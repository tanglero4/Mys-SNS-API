const { Reaction } = require('../models/Index');
const User = require('../models/User');
const Thought =require(`../models/Thought`);
const userController = {
  // Retrieve all users
getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Create a new user
createUser(req, res) {
  User.create(req.body)
  .then((dbUserData) => res.json(dbUserData))
  .catch((err) => res.status(500).json(err));
},
// Get a single user
getSingleUser(req, res) {
  User.findOne({ _id: req.params.userId })
    .select('-__v').populate("thoughts")
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
  // Delete a user 
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'There are no users with that ID' })
          : Reaction.deleteMany({ _id: { $in: user.reactions } })
      )
      .then(() => res.json({ message: 'User has been deleted!' }))
      .catch((err) => res.status(500).json(err));
  },



}
  module.exports = userController