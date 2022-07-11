const router = require('express').Router();

const {
    createThought,
    removeThought,
    findAllThoughts,
    findThoughtById,
    updateThought,
    createReaction,
    removeReaction,
} = require('../../controllers/thoughts-controller');

// /api/thoughts
router
    .route('/')
    .get(findAllThoughts)

router.route('/:userId').post(createThought)

// /api/thoughts/:id
router
    .route('/:userId/:thoughtId')
    .get(findThoughtById)
    .put(updateThought)
    .delete(removeThought);

// reactions
router
    .route('/:thoughtId/:reactions')
    .post(createReaction)
    .delete(removeReaction);

module.exports = router;