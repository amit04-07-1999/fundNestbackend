const router = require('express').Router();

const { signup, login, logout} = require('../controller/authcontroller');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
// router.get('/user/:id', getUserById);
// router.put('/user/:id', updateUser);
// router.delete('/user/:id', deleteUser);


module.exports = router;