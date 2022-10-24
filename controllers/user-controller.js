const { User } = require('../../models');

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
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
        .then((user) => !user ? res.status(404).json({ message: 'No user with this ID'}) : res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // delete user
    deleteUser(req, res){
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => !user ? res.status(404).json({ message: 'No user with this ID'}) : res.json(user))
        .catch((err) => res.status(500).json(err));
    },

};