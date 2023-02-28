const { Ponder, User } = require('../models');

module.exports = {
  // Retrieve thoughts
  getPonder(req, res) {
    Ponder.find()
      .then((pondering) => res.json(pondering))
      .catch((err) => res.status(500).json(err));
  },
  // Retrieve one thought
  getPonder(req, res) {
    Ponder.findOne({ _id: req.params.ponderId })
      .select('-__v')
      .then((ponder) =>
        !ponder
          ? res.status(404).json({ message: 'No views found' })
          : res.json(ponder)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Make a thought
  makePonder(req, res) {
    Ponder.create(req.body)
      .then((ponder) => res.json(ponder))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete thoughts
  detePonder(req, res) {
    Ponder.findOneAndDelete({ _id: req.params.ponderId })
      .then((ponder) =>
        !ponder
          ? res.status(404).json({ message: 'No views with that ID' })
          : User.deleteMany({ _id: { $in: ponder.users } })
      )
      .then(() => res.json({ message: 'Views and Users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
updatePonder(req, res) {
  Ponder.findOneAndUpdate(
      { _id: req.params.ponderId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((ponder) =>
        !ponder
          ? res.status(404).json({ message: 'No views with this id!' })
          : res.json(ponder)
      )
      .catch((err) => res.status(500).json(err));
  },
};
