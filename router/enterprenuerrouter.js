const router = require('express').Router();

const { getCurrentUser, editProfile, getAllInvestors, deleteEnterprenuer} = require('../controller/enterprenuercontroller');

router.get('/currentuser', getCurrentUser);
router.patch('/editprofile', editProfile);
router.get('/investors', getAllInvestors);
router.delete('/deleteuser', deleteEnterprenuer);

module.exports = router;