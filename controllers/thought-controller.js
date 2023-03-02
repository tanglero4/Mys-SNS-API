const { Reaction } = require('../models/Reaction');
const {User, Thought} = require('../models');


const thoughtController = {
    // Create thoughts
    createThought(req, res) {
      Thought.create(req.body)
        .then((dbThoughtData) => {
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: dbThoughtData._id } },
            { new: true }
          );
        })
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: 'Thought created but no user with this id!' });
          }
  
          res.json({ message: 'Thought successfully created!' });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
// Get thoughts
  getThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>
    !thought
      ? res.status(404).json({ message: 'There are no thoughts with that ID' })
      : User.deleteMany({ _id: { $in: thought.user } })
  )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  }
    module.exports = thoughtController