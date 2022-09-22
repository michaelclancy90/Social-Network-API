const { ObjectId } = require('mongoose').Types;
const { Reaction, Thought } = require('../models');

module.exports = {
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reaction: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'Reaction created, but no thought found' })
          : res.json(thought)
      )
      .catch((err) => res.staus(500).json(err));
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reaction: { _id: ObjectId(req.params.reactionId) } } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Thought ID not recognised' })
          : res.json(thought)
      )
      .catch((err) => res.staus(500).json(err));
  },
};
