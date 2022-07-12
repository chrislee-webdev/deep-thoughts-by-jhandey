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
    .route('/:thoughtId')
    .get(findThoughtById)
    .put(updateThought)
    
router.route('/:thoughtId').delete(removeThought)

// reactions
router
    .route('/reaction/:thoughtId')
    .put(createReaction)

router.route('/reaction/:thoughtId').delete(removeReaction);

module.exports = router;