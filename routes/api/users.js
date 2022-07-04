const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser
} = require('../../controller/user-controller')

// /api/user
router 
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:id
router
    .route('/:id')
    .get(getUserById)