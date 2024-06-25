const router = require('express').Router();

const { editProfile, getCurrentUser, deleteUser, getAllEnterprenuers, getEntrepreneurById, sendMessageToEntrepreneur, getMessagesWithEntrepreneur} = require('../controller/investorcontroller');
const { middleware } = require('../middleware/jwtmiddleware');

router.get('/currentuser', getCurrentUser);
router.patch('/editprofile', editProfile);
router.delete('/deleteuser', deleteUser);
router.get('/enterprenuers', getAllEnterprenuers);
router.get('/enterprenuer/:id', getEntrepreneurById);
router.post('/send-message/:entrepreneurId',middleware, sendMessageToEntrepreneur);
router.get('/messages/:roomId',getMessagesWithEntrepreneur);



module.exports = router;

