const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getSingleThoughts(req, res) {
    Thought.findOne({ _id: req.params.userid })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Thought ID not recognised' })
          : res.json(user)
      )
      .catch((err) => res.staus(500).json(err));
  },

  createNewThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    ).then((thought) =>
      !user
        ? res.status(404).json({ message: 'Thought ID not recognised' })
        : res.json(thought)
    );
  },

  deleteThought(req, res) {
    Thought.deleteOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Thought ID not recognised' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
