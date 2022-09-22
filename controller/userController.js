const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const friendCount = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfFriends) => numberOfFriends);

module.exports = {
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          friendCount: await friendCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userid })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json(user)
      )
      .catch((err) => res.staus(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ id: req.params.userid })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'User id not recognised' })
          : Thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'User deleted, but no thought found' })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    ).then((user) =>
      !user
        ? res.status(404).json({ message: 'User id not recognised' })
        : res.json(user)
    );
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    ).then((userData) => {
      res.json(userData);
    });
  },

  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    ).then((friendData) => {
      res.json(friendData);
    });
  },
};
