const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/user
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

// Set up Get one, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// And/Remove Friend
router
    .route('/:userId/friends/:friendsId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;