const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) => !user ? res.status(404).json({ message: 'No user with this ID' }) : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // create new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // update user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((user) => !user ? res.status(404).json({ message: 'No user with this ID' }) : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // delete user and thoughts associated
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => !user ? res.status(404).json({ message: 'No user with this ID' }) : Thought.deleteMany(
                { username: user.username },
            )
            )
            .then((results) => !results ? res.status(404).json({ message: 'User deleted but could not delete thought' }) : res.json({ message: 'User and thoughts associated were deleted' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((friendData) => !friendData ? res.status(404).json({ message: 'No user found with this id' }) : res.json({ message: 'Friend has been added' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((friendData) => !friendData ? res.status(404).json({ message: 'No user found with this id' }) : res.json({ message: 'Friend has been deleted' })
            )
            .catch((err) => res.status(500).json(err));
    }
};