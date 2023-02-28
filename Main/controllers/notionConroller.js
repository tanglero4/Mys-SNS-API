const { Notion, userName } = require('../models');

module.exports = {
  // Retrieve notions
  getNotions(req, res) {
    Notion.find()
      .then((notions) => res.json(notions))
      .catch((err) => res.status(500).json(err));
  },
  // Retrieve one notion
  getNotion(req, res) {
    Notion.findOne({ _id: req.params.notionId })
      .select('-__v')
      .then((notion) =>
        !notion
          ? res.status(404).json({ message: 'No notions found' })
          : res.json(notion)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Make a notion
  makeNotion(req, res) {
    Notion.create(req.body)
      .then((notion) => res.json(notion))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete notions
  deteNotion(req, res) {
    Notion.findOneAndDelete({ _id: req.params.notionId })
      .then((notion) =>
        !notion
          ? res.status(404).json({ message: 'No notions with that ID' })
          : User.deleteMany({ _id: { $in: notion.userName } })
      )
      .then(() => res.json({ message: 'Notions and user name has been deleted' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a notion
updateNotion(req, res) {
  Notion.findOneAndUpdate(
      { _id: req.params.notionId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((notion) =>
        !notion
          ? res.status(404).json({ message: 'No thoughts found!' })
          : res.json(notion)
      )
      .catch((err) => res.status(500).json(err));
  },
};
