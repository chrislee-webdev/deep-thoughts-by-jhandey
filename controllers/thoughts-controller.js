const { Thought, User } = require('../models');

const thoughtsController = {
    //add thought to user
        createThought({ params, body }, res) {
            console.log(params);
            Thought.create(body)
                .then(({ _id }) => {
                    return User.findOneAndUpdate(
                        { _id: params.userId},
                        { $push: { thought: _id } },
                        { new: true }
                    );
                })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json( { message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //remove thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // find all thoughts
    findAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v',
            })
            .select('-__v')
            .sort({ _id: -1 })            
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // find a thought
    findThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // update a thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found' });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    },

    // create a reaction
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reaction: body } },
            { new: true, runValidators: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.json(404).json({ message: 'No thought found' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // remove a reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reaction: { reactionId: params.reactionId} } },
            { new: true }
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch(err => res.json(err))
    }
};

module.exports = thoughtsController;