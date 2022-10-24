const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // get single thought by _id
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => !thought ? res.status(404).json({ message: 'No thought found with this ID' }) : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: Thought._id } },
                    { new: true }
                );
            })
            .then((user) => !user ? res.status(404).json({ message: 'Thought created, but no user found with that ID' }) : res.json('Created the video ✔️')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // update a thought by its _id
    updateThought(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => !thought ? res.status(404).json({ message: 'No thought with this ID' }) : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // delete thought by its _id
    deleteThought(req, res){
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) => !thought ? res.status(404).json({ message: 'No thought with this ID'}) : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        )
        )
        .then((user) => !user ? res.status(404).json({ message: 'No user with this ID' }) : res.json({ message: 'Thought successfully deleted' })
        )
        .catch((err) => res.status(500).json(err));
    },
    // add a reaction to a thought
    createReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) => !thought ? res.status(404).json({ message: 'No thought with this ID'}) : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // remove thought reaction
    deleteReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thought) => !thought ? res.status(404).json({ message: 'No thought with this ID'}) : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};