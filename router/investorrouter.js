const router = require('express').Router();

const { editProfile, getCurrentUser, deleteUser, getAllEnterprenuers} = require('../controller/investorcontroller');

router.get('/currentuser', getCurrentUser);
router.patch('/editprofile', editProfile);
router.get('/enterprenuers', getAllEnterprenuers);
router.delete('/deleteuser', deleteUser);

module.exports = router;

