const { ObjectId } = require('mongoose').Types;
const { UserName, Notion } = require('../models/index');

module.exports = {
  // Retrieves all user names
  getUserNames(req, res) {
    UserName.find()
   .populate("notions") .then(async (userName) => {
    const userNameObj = {
     userName
    };
    return res.json(userNameObj);
  })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user name
  getSingleUserName(req, res) {
    UserName.findOne({ _id: req.params.userNameId })
      .select('-__v')
      .then(async (userName) =>
        !userName
          ? res.status(404).json({ message: 'No such user name with that ID' })
          : res.json({
            userName,
     
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user name
  createUserName(req, res) {
    UserName.create(req.body)
      .then((userName) => res.json(userName))
      .catch((err) => res.status(500).json(err));
  },
  // Delete user name and remove them from the notions
  deleteUserName(req, res) {
    UserName.findOneAndRemove({ _id: req.params.userNameId })
      .then((student) =>
        !student
          ? res.status(404).json({ message: 'No such user name' })
          : UserName.findOneAndUpdate(
              { userName: req.params.userNameId },
              { $pull: { userName: req.params.userNameId } },
              { new: true }
            )
      )
      .then((userName) =>
        !userName
          ? res.status(404).json({
              message: 'User name deleted and no thoughts found',
            })
          : res.json({ message: 'User name has been deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
//   Add a friend
  addAFriend(req, res) {
    UserName.findOneAndUpdate(
      { _id: req.params.userNameId },
      { $addToSet: { reactions: req.body.newFriendId } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No friends found!' });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Add an reaction to a user name
  addReaction(req, res) {
    console.log('You added a new reaction');
    console.log(req.body);
    UserName.findOneAndUpdate(
      { _id: req.params.userNameId },
      { $addToSet: { reaction: req.body } },
      { runValidators: true, new: true }
    )
      .then((userName) =>
        !userName
          ? res
              .status(404)
              .json({ message: 'No user names found with that ID 🥺' })
          : res.json(userName)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction from a user name
  removeReaction(req, res) {
    UserName.findOneAndUpdate(
      { _id: req.params.userNameId },
      { $pull: { reaction: { reactionId: req.params.reationId } } },
      { runValidators: true, new: true }
    )
      .then((userName) =>
        !userName
          ? res
              .status(404)
              .json({ message: 'No user names found with that ID 🥺' })
          : res.json(userName)
      )
      .catch((err) => res.status(500).json(err));
  },
};
