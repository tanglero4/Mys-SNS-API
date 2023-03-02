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
  // get single thought
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
  // Update thoughts
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    ).sort({ createdAt: -1 })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thoughts have been updated!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>
    !thought
      ? res.status(404).json({ message: 'There are no thoughts with that ID' })
      : User.deleteMany({ _id: { $in: thought.user } })
  ) .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Add reaction to thought
  addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reacting: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove Reaction from thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reacting: { reactingId: req.params.reactingId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  }
    module.exports = thoughtController