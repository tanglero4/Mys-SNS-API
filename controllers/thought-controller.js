const { Reaction } = require('../models/Reaction');
const Thought = require('../models/Thought');

const thoughtController = {
    // Retrieve all thoughts
  // getThoughts(req, res) {
  //   Thought.find()
  //       .then((users) => res.json(users))
  //       .json({ message: 'No thoughts found with that ID :(' })
  //       .catch((err) => res.status(500).json(err));
  //   },
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
  
    // Create new thought
  // createThought(req, res) {
  //   Thought.create(req.body)
  //   .then((dbUserData) => res.json(dbUserData))
  //   .json({ message: 'No new thought found with that ID :(' })
  //   .catch((err) => res.status(500).json(err));
  // },
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

  }
    module.exports = thoughtController